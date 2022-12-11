const { createShipper, shipperReceive, getAllOrder, searchOrder, confirmOrder, createReport, editReport, deleteReport, getAllReport } = require("../controllers/shipper");
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


// tao mot report 
router.post('/createreport',verifyToken,createReport);
// update report
router.put('/updatereport/:id',verifyToken,editReport);
// delete report 
router.delete('/deletereport/:id',verifyToken,deleteReport);
// lay danh sach cac report
router.get('/getallreport',verifyToken,getAllReport);


module.exports = router;