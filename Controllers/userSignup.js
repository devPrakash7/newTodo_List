
const userModel = require("../Models/userSignup");
const bcrypt = require("bcrypt");
const { remove } = require("../Models/userSignup");


 const Signup = async (req,res) => {

  try{

    const reqBody = req.body;
    
  
    const {userName , Email , password} = reqBody;
    
      const duplicateEmail = await userModel.findOne({Email:Email});
      if (duplicateEmail) {
        return res.status(400).send({
          status: false,
          message: `${Email} email address is already registered`,
        });
      }

    const saltRound = 10;
    reqBody.password = await bcrypt.hash(password , saltRound);

    const user = await userModel.create(reqBody);
     user.password = null
    return res.status(201).send({data:user});
    
  }catch(err){

    return res.status(500).send({error: err.message});
   }
 }


 module.exports = {Signup}