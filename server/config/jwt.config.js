const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    
    console.log("cookies",req.cookies.userToken)
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) { 
            console.log('authenticated error',err)
            res.status(401).json({verified: false});
        } else {
            console.log('authenticated!')
            next();
        }
    });
}