const db = require("../models");
const customer = require("../models/customer");
const user = require("./user");

// tao mot don hang do Customer
exports.createOrder = async (req, res) => {
    const {
        nameReceiver,
        addressReceiver,
        phoneReceiver,
        status,
        addressCustomer,
        id_Commodities,
        totalMoney,
    } = req.body

    try {

        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idCustomer(_id);
        console.log(__id);

        const order = await db.Order.create({
            nameReceiver,
            addressReceiver,
            phoneReceiver,
            status :null ,
            addressCustomer,
            id_Commodities,
            totalMoney,
            id_Customer: __id
        })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}



exports.getAllOrder = async (req, res) => {
    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idCustomer(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                id_Customer: __id
            }
        });

        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// lay danh sach hang chua duoc giao
exports.getAllOrderF = async (req, res) => {
    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idCustomer(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                id_Customer: __id,
                status: 'false',
            }
        });

        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// chinh sua don hang chua duoc giao
exports.editOrderF = async (req, res) => {
    const {
        nameReceiver,
        addressReceiver,
        phoneReceiver,
        status,
        addressCustomer,
        id_commodities,
        totalmoney,
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
        var order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        }

        order = await db.Order.update({
            nameReceiver,
            addressReceiver,
            phoneReceiver,
            status,
            addressCustomer,
            id_commodities,
            totalmoney,
        }, {
            where: {
                id: order.id
            }
        })
        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};
// huy don hang chua duoc giao 
exports.deleteOrder = async (req, res) => {
    const {
        id
    } = req.params;
    if (!id) return res.status(404).json({
        success: false,
        msg: 'Not found !'
    })
    try {
        const order = await db.Order.destroy({
            where: {
                id
            }
        })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}