const db = require("../models");
const Customer = require("../models/customer");
const user = require("./user");

exports.createCustomer = async (req, res) => {
    const {
        fullname,
        address,
        phone,
        gender,
        notification,
        birthday
    } = req.body;

    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);

        const customer = await db.Customer.create({
            fullname,
            address,
            phone,
            gender,
            notification,
            birthday,
            userId: _id,
        })
        return res.status(200).json({
            success: true,
            customer
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
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
        success: false,
        msg: 'Not Found!',
    })
    try {
        let customer = await db.Customer.findByPk(id)
        if (customer.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
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
        return res.status(200).json({
            success: true,
            customer
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
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
        success: false,
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
                success: false,
                msg: 'Not Found !'
            })
        } else {
            return res.status(200).json({
                success: false,
                data: order.status
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
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
        success: false,
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
                success: false,
                msg: 'Not Found !'
            })
        } else {
            return res.status(200).json({
                success: true,
                order
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
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
        success: false,
        msg: 'Fail!',
    })
    try {
        let customer = await db.Customer.findByPk(id)
        if (customer.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
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
        return res.status(200).json({
            success: true,
            data: customer.id
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};

// lay ra danh sach cac loai hang hoa 
exports.getAllCommodities = async (req, res) => {
    try {
        const commodities = await db.Commodities.findAll({});
        return res.status(200).json({
            success: true,
            commodities
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// tao mot report 
exports.createReport = async (req, res) => {
    const {
        content,
        status
    } = req.body;
    const email = res.req.Account.email;
    const _id = await user.idUser(email);
    console.log(_id);
    try {
        const report = await db.ReportUser.create({
            content,
            userId: _id,
            status,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// chinh sua mot report 
