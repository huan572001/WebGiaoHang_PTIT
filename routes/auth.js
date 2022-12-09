const { register, login } = require("../controllers/auth");
const { verifyToken } = require("../middleware/middleware");
const router = require("express").Router();

router.post('/register',register)
router.post('/login',login)

module.exports = router;