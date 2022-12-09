const { getAllCustomer, getAllShipper, lockUser, getAllOrder, unLockUser } = require("../controllers/admin");
const { verifyTokenAdmin } = require("../middleware/middleware");

const router = require("express").Router();
// in dach sach cac customer
 router.get("/getallc", getAllCustomer);
 // in danh sach cac shipper
 router.get("/getalls", getAllShipper);
 // in danh sach cac don hang
 router.get("/getallorder",getAllOrder );
 // khoa tai khoan
 router.put("/lockuser/:id", verifyTokenAdmin,lockUser);
 // mo khoa tai khoan 
 router.put("/unlockuser/:id", verifyTokenAdmin,unLockUser);

module.exports = router;
