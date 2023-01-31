
const Models = require("../Models/userModels");
const userModel = require("../Models/userSignup");
const moment = require("moment");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")


const getDetalis = async (req, res) => {

     const tokenId = req.headers.authorization;
    const token = tokenId.substring("Bearer ".length);
     
    let object;

    if (!token) {
      throw new Error("Authorization token is required");
    } 
   jwt.verify(token, "prakash123", function (err, decoded) {
      if (err) {
        throw new Error("Error : " + err);
      }
       object = decoded;
    });

  let UserId = object.userId;

  const user = await userModel.findById(UserId);
  
  if (!user) {
    return res.status(400).send({ status: false, msg: "No such data found" });
  }
 
      const findDetalis = await Models.findOne({UserId})
    findDetalis.date = moment().format("DD/MM/YYYY hh:mm:ss")
      res.status(200).send({ status: true, msg: findDetalis});
};


module.exports = { getDetalis };