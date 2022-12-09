const db = require("../models");
const Customer = require("../models/customer");
const user = require("./user");

exports.createCustomer = async (req, res) => {
    const {
        fullname,
        address,
        phone,
        email,
        gender,
        notification,
        birthday
    } = req.body;

    try {
        const username = res.req.User.username;
        const _id = await user.idUser(username);
        console.log(_id);

        const customer = await db.Customer.create({
            fullname,
            address,
            phone,
            email,
            gender,
            notification,
            birthday,
            userId: _id,
        })
        return res.status(200).json(customer)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};

exports.updateCustomer = async (req, res) => {
    const {
        fullname,
        address,
        phone,
        email,
        gender,
        notification,
        birthday
    } = req.body;

    const {
        id
    } = req.params;
    console.log(id)
    if (!id) return res.status(500).json({
        msg: 'Fail!',
    })
    try {
        let customer = await db.Customer.findByPk(id)
        if (customer.id != id) {
            return res.status(404).json('Not Found')
        } else {
            customer = await db.Customer.update({
                fullname,
                address,
                phone,
                email,
                gender,
                notification,
                birthday
            }, {
                where: {
                    id: customer.id
                }
            })
        }
        return res.status(200).json(customer.id)

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};

exports.seeStatus = async (req, res) => {
    const {
        id
    } = req.params;
    if (!req.params) return res.status(404).json({
        msg: 'Not Found !',
    })
    try {
        const order = await db.Order.findOne({
            where: {
                id
            }
        })
        if (!order.id) {
            return res.status(404).json({
                msg: 'Not Found !'
            })
        } else {
            return res.status(200).json(order.status)
        }

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};

exports.findOrder = async (req, res) => {
    const {
        id
    } = req.params;
    if (!req.params) return res.status(404).json({
        msg: 'Not Found !',
    })
    try {
        const order = await db.Order.findOne({
            where: {
                id
            }
        })
        if (!order.id) {
            return res.status(404).json({
                msg: 'Not Found !'
            })
        } else {
            return res.status(200).json(order)
        }

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }

}

// add dia chi lay hang Customer

exports.updateCustomerSender = async (req, res) => {
    const {
        address,
        phone
    } = req.body;

    const {
        id
    } = req.params;
    console.log(id)
    if (!id) return res.status(500).json({
        msg: 'Fail!',
    })
    try {
        let customer = await db.Customer.findByPk(id)
        if (customer.id != id) {
            return res.status(404).json('Not Found')
        } else {
            customer = await db.Customer.update({
                address,
                phone
            }, {
                where: {
                    id: customer.id
                }
            })
        }
        return res.status(200).json(customer.id)

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};