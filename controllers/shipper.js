const db = require("../models")
const Order = require("../models/order")
const user = require("./user")

exports.createShipper = async (req, res) => {
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

        const shipper = await db.Shipper.create({
            fullname,
            address,
            phone,
            email,
            gender,
            notification,
            birthday,
            userId: _id,
        })
        return res.status(200).json(shipper)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};
//  xac nhan da nhan don tu chu cua hang
exports.shipperReceive = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        var order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json('Not Found')
        }
        const username = res.req.User.username;
        const _id = await user.idUser(username);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        order = await db.Order.update({
            id_Shipper: __id
        }, {
            where: {
                id: order.id
            }
        })
        return res.status(200).json(order)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// lay danh sach toan bo cac don hang da nhan 
exports.getAllOrder = async (req, res) => {
    try {
        const username = res.req.User.username;
        const _id = await user.idUser(username);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                id_Shipper: __id
            }
        });

        return res.status(200).json(order)

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// tra cuu cac don hang da nhan
exports.searchOrder = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        let order = await db.Order.findOne({
            where: {
                id
            }
        });
        if (order.id != id) {
            return res.status(404).json('Not Found')
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
// xac nhan tren don hang dang giao da hoan thanh
exports.confirmOrder = async (req, res) => {
    const {
        id
    } = req.params
    try {
        let order = await db.Order.findOne({
            where: {
                id
            }
        });
        if (order.id != id) {
            return res.status(404).json('Not Found')
        } else {
            order = await db.Order.update({
                status : 1
            }, {
                where: {
                    id: order.id
                }
            })
        }
        return res.status(200).json(order)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}