
const mongoose  = require("mongoose");


const Schema = new mongoose.Schema({

     userName : {
        type: String,
        required:true
       
     },
     Email:{
        type:String,
        required:true,
         unique:true
     },
     password:{
        type:String,
        required:true
      
     },
},
   {timestamps:true}
);

const userModel = mongoose.model("Signup", Schema);
module.exports = userModel;