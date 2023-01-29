
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
        type:Date,
        required:true,
        default:null
      
     },
     Time:{
       type:String,
       required:true,
       default:null
       
     },
     
     Task : {
        type:String ,
        required:true
     },
     userId:{
        
        type:ObjectId,
        ref:"Signup"
     },
    

    
},
   {timestamps:true}
);

const usermodels = mongoose.model("user",Schema);
module.exports = usermodels;