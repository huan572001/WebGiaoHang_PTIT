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
        return res.status(200).json({
            success:true,
            user});
    } catch (err) {
        return res.status(500).json({
            success:false,
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
        return res.status(200).json({
            success:true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success:false,
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
        return res.status(200).json({
            success:true,
            user})
    } catch (err) {
        return res.status(500).json({
            success:false,
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
        return res.status(200).json({
            success:true,
            user})
    } catch (err) {
        return res.status(500).json({
            success:false,
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
        return res.status(200).json({
            success:true,
            data})
    } catch (err) {
        return res.status(500).json({
            success:false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// them mot loai hang moi
exports.createCommodities = async (req,res) => {
    const {name,cost} = req.body
    try {
        if (!name || !cost)
        return res.status(400).json({
            success: false,
            err: 1,
            msg: 'Missing inputs !'
        })
        const commodities = await db.Commodities.create({
            name,
            cost
        })
        return res.status(200).json({
            success:true,
            data: commodities
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// update mot don hang
exports.updateCommodities = async( req,res) => {
    const {name,cost} = req.body;
    const {id} = req.params;
    try {
        if (!name || !cost)
        return res.status(400).json({
            success: false,
            err: 1,
            msg: 'Missing inputs !'
        })
        if (!id) return res.status(500).json({
            success: false,
            msg: 'Not Found!',
        })
        let commodities = await db.Commodities.findByPk(id)
        if (commodities.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        } else {
        commodities = await db.Commodities.update({
            name,
            cost, 
        },{
            where: {
                id : commodities.id,
            }
        })
        return res.status(200).json({
            success:true,
        })
    }
    } catch (err) {
        return res.status(500).json({
            success:false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// xoa mot loai hang hoa
exports.deleteCommodities = async (req, res) => {
    const {
        id
    } = req.params;
    if (!id) return res.status(404).json({
        success: false,
        msg: 'Not found !'
    })
    try {
        const commodities = await db.Commodities.destroy({
            where: {
                id
            }
        })
        return res.status(200).json({
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}