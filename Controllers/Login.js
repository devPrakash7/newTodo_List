const userModel = require("../Models/userSignup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const Login = async(req,res) => {

    try {
        let reqBody = req.body;
        //Extract Params
        let { Email, password } = reqBody;

      
        let user = await userModel.findOne({ Email });
        if (!user)
            return res.status(400).send({ status: false, message: "Login failed! Email  is incorrect." });

        let passwordInBody = user.password;
        let encryptPassword = await bcrypt.compare(password, passwordInBody);

        if (!encryptPassword) return res.status(400).send({ status: false, message: "Login failed! password is incorrect." });
        //Validation End

        let userId = user._id
        // create token
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
            },
            'prakash123'
        );
        
        res.header("x-api-key", token);

        res.status(200).send({ status: true, message: 'Success', userId: { userId, token } });

    } catch (err) {
        res.status(500).send({ message: "Server not responding", error: err.message });
    }
}

module.exports = {Login};