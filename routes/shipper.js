const { createShipper, shipperReceive, getAllOrder, searchOrder, confirmOrder } = require("../controllers/shipper");
const { verifyToken } = require("../middleware/middleware");

const router = require("express").Router();
// tao thong tin nguoi dung 2
router.post('/create',verifyToken,createShipper);
// xac nhan da nhan don tu chu cua hang
router.put('/shipperreciever/:id',verifyToken,shipperReceive)
// in danh sach don hang
router.get('/getall',verifyToken,getAllOrder);
// tra cuu don hang da nhan
router.get('/search/:id',searchOrder);
// xac nhan tren don hang dang giao
router.put('/status/:id',confirmOrder);
module.exports = router;