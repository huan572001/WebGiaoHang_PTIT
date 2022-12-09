const db = require("../models");
const Customer = require("../models/customer");


// lay toan bo danh sach customer
exports.getAllCustomer = async (req, res) => {
    try {
        const user = await db.User.findAll({
            where: {
                role: 'customer'
            }
        })
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// lay toan bo danh sach shipper
exports.getAllShipper = async (req, res) => {
    try {
        const user = await db.User.findAll({
            where: {
                role: 'shipper'
            }
        })
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

exports.lockUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user = await db.User.update({
            isAcctive: 1,
        }, {
            where: {
                id
            }
        })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

exports.unLockUser = async (req,res) => {
    const {
        id
    } = req.params;

    try {
        const user = await db.User.update({
            isAcctive: 0,
        }, {
            where: {
                id
            }
        })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        // const data = await db.Customer.findAll({
        //     include: [{
        //         model: db.Order,
        //         as: 'order',
        //         //attributes: ['id']
        //     }]
        // })
        const data = await db.Order.findAll({})
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}