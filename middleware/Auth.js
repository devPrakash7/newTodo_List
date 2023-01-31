
const jwt = require('jsonwebtoken');


const userAuth = async (req, res, next) => {

    try {

        let bearerHeader = req.headers.authorization;

        if (typeof bearerHeader == "undefined") return res.status(400).send({ status: false, message: "Token is missing, please enter a token" });

        let bearerToken = bearerHeader.split(' ');

        let token = bearerToken[1];

        jwt.verify(token, "prakash123", function (err, data) {
            if (err) {
                return res.status(400).send({ status: false, message: "Token is invalid" })
            }
           else {
                req.decodedToken = data;
                console.log(req.decodedToken);
            
                next()
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


module.exports = {

    userAuth
}