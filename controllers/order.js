const db = require("../models");
const customer = require("../models/customer");
const user = require("./user");

exports.createOrder = async (req, res) => {
    const {
        nameReceiver,
        addressReceiver,
        phoneReceiver,
        status,
        commodities
    } = req.body

    try {

        const username = res.req.User.username;
        const _id = await user.idUser(username);
        console.log(_id);
        const __id = await user.idCustomer(_id);
        console.log(__id);

        const order = await db.Order.create({
            nameReceiver,
            addressReceiver,
            phoneReceiver,
            status,
            commodities,
            id_Customer: __id
        })
        return res.status(200).json(order)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const username = res.req.User.username;
        const _id = await user.idUser(username);
        console.log(_id);
        const __id = await user.idCustomer(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                id_Customer: __id
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
// chinh sua don hang chua duoc giao
exports.editOrderF = async (req, res) => {
    const {
        nameReceiver,
        addressReceiver,
        phoneReceiver,
        status,
        commodities,
    } = req.body;

    const {
        id
    } = req.params;
    console.log(id)
    if (!id) return res.status(500).json({
        msg: 'Fail!',
    })
    try {
        var order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json('Not Found')
        }
        
         order = await db.Order.update({
            nameReceiver,
            addressReceiver,
            phoneReceiver,
            status,
            commodities,
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
};