const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user");
require('dotenv').config()

exports.idUser = async (username) => {
    try {
        const loggeduser = await db.User.findOne({
            where: {
                username
            },
            raw: true
        })
        return loggeduser.id;


    } catch (err) {
        reject(err)
    }
}
exports.roleUser = async (username) => {
    try {
        const loggeduser = await db.User.findOne({
            where: {
                username
            },
            raw: true
        })
        return loggeduser.role;


    } catch (err) {
        reject(err)
    }
}


exports.idCustomer = async (userId) => {
    try {
        const customer = await db.Customer.findOne({
            where: {
                userId
            }
        })
        return customer.id;
    } catch (err) {
        reject(err)
    }
}

// exports.idShow = async (id) => {
//     let order= await db.Order.findByPk(id)
//     if (order.id != id) {
//         return res.status(404).json('Not Found')
//     } 
//     // else return order.id;
// }