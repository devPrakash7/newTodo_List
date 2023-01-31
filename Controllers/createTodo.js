
const Models = require("../Models/userModels");
const moment = require("moment");
const userModel = require("../Models/userSignup");
const jwt = require("jsonwebtoken");
const { search } = require("../Routes/rout");



const createUser = async (req,res) => {

 try{

    const reqBody = req.body;
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

  let NewuserId = object.userId;
  
    let {Title , Desc, Task, UserId} = reqBody;
  
    const SearchId = await userModel.findById(NewuserId);
  
    if (!SearchId) {
      return res
        .status(400)
        .send({ status: false, message: `user does not exists.` });
    }
    
    
    const currentDate = moment().format('X');
  
    const obj = {

        Title,
        Desc,
        Task,
        UserId:NewuserId,
        date: currentDate

    }
    
      const newuser = await Models.create(obj);
      
      return res.status(201).send({
        status: true,
        message: "create successfully",
        data: newuser,
      });
    
  }catch(err){

    res.status(500).send({status:false , msg:err.message});
    
  }
}


module.exports = {createUser}








