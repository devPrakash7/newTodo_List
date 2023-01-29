
const Models = require("../Models/userModels");
const moment = require("moment");
const userModel = require("../Models/userSignup");



const createUser = async (req,res) => {

 try{

    const reqBody = req.body;
    const tokenId = req.userId;
    console.log(tokenId);
    
    let {Title , Desc, Task, Time , date, userId} = reqBody;
    console.log(userId);

    if(userId !== tokenId){
    
      return res.status(400).send({
        status: false,
        message: 'Unauthorised Access. Please login again!',
      });
    }

    const SearchId = await userModel.findById(userId);
    
    if (!SearchId) {
      return res
        .status(400)
        .send({ status: false, message: `user does not exists.` });
    }


    let currDate = moment().toDate();
    let currentDate = new Date()
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    


    const obj = {

        Title,
        Desc,
        Task,
        userId,
        date:currDate,             
        Time:time
        
    }
  
      const newuser = await Models.create(obj);
      console.log(newuser)
      
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








