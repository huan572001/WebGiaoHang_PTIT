const e = require("cors");
const authController = require("./authController");
const User = require("../models/user")
exports.register = async (req, res) => {
    const {
        username,
        password,
        role
    } = req.body;
    try {
        if (!username || !password || !role)
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs !'
            })
        const response = await authController.registerService(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};


exports.login = async (req, res) => {
    const {
        username,
        password
    } = req.body
    try {
        if (!username || !password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        // console.log(response);//
        // if (User.isAcctive === 1) return res.status(400).json({
        //     err: 1,
        //     msg: 'Tai khoan bi khoa'
        // })
        // const a = customerService.roleUser(username)
        const response = await authController.loginService(req.body)
        if (response.data.isAcctive === 1) return res.status(400).json({
            msg: 'Tai khoan cau ban da bi khoa !'
        })
        else {
            return res.status(200).json({
                response

            })
        }

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }

};