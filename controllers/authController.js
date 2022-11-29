const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

exports.registerService = ({
    username,
    password,
    role
}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: {
                username
            },
            defaults: {
                username,
                password: hashPassword(password),
                role

            }
        })
        const token = response[1] && jwt.sign({
            username: response[0].username,
            password: response[0].password
        }, process.env.SECRET_KEY, {
            expiresIn: '365d'
        })
        resolve({
            err: token ? 0 : 2, // 0 thanh cong // 2 that bai
            msg: token ? 'Register is successfully !' : 'Username has been aldready used !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
});

exports.loginService = ({
    username,
    password
}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: {
                username
            },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.hashSync(password, response.password);
        const token = isCorrectPassword && jwt.sign({
            username: response.username,
            password: response.password
        }, process.env.SECRET_KEY, {
            expiresIn: "365d"
        })
        //console.log(User.id)//
        resolve({
            data: response,
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Username not found !',
            token: token || null
        })
    } catch (err) {
        reject(err)
    }
})