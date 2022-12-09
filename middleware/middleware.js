const jwt = require("jsonwebtoken");
const { roleUser, idUser } = require("../controllers/user");
require('dotenv').config();
const user = require("../controllers/user");


exports.verifyToken = (req,res,next) => {
    const token = req.get("Authorization");
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,User) => {
            if(err) {
                res.status(403).json("Token is not vilid");
            }
            req.User = User;
            console.log(User);
            next();

        });
    } else {
        res.status(401).json("You're not authenticated");

    }
};

exports.verifyTokenAndAdmin = (req,res,next) => {
    this.verifyToken(req,res, () => {
        if (req.User.role === 'shipper'){
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

exports.verifyTokenAdmin = (req,res,next) => {
    this.verifyToken(req,res, async () => {
        const username = res.req.User.username;
        const role = await user.roleUser(username)
        console.log(role);
        if (role === 'admin')
        {
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

exports.verifyTokenAndCustomer = (req,res,next) => {
    this.verifyToken(req,res, () => {
        if (req.User.username === req.params.username || req.User.role === 'customer'){
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

//|| req.User. === 'admin'