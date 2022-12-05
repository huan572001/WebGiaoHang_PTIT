const { createCustomer, updateCustomer, seeStatus, findOrder } = require("../controllers/customer");
const { createOrder, getAllOrder, editOrderF } = require("../controllers/order");

const router = require("express").Router();
const {verifyToken} = require("../middleware/middleware")
router.post('/create',verifyToken,createCustomer)
router.put('/update/:id',updateCustomer)
router.get('/getstatus/:id',seeStatus)
router.get('/getorder/:id',findOrder)
router.post('/createorder',verifyToken,createOrder)
router.get('/getall',verifyToken,getAllOrder)
router.put('/updateOrder/:id',editOrderF)

module.exports = router;