
const mongoose  = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId


const Schema = new mongoose.Schema({

     Title : {
        type: String,
        required:true,
       
     },

     Desc:{
        type:String,
        required:true,
     },

     date:{
        type:String,
        required:true,
        default:null
      
     },
    
     Task : {
        type:String ,
        required:true
     },

     UserId : {

         type:ObjectId,
         ref:"Signup"
     }
    
   }
);

const usermodels = mongoose.model("user",Schema);
module.exports = usermodels;