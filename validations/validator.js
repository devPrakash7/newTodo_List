
const { check , validationResult } = require('express-validator');


const validator = [

check("userName")
   .notEmpty()
   .withMessage("username is required")
   .isString()
   .withMessage("username should be a string")
   .isLength({min:3})
   .withMessage("username should be 3 character long")
   .trim(),
check("Email", "Email is required").notEmpty().trim().isString().withMessage("email should be a string").isEmail(),
check("password", "password is required").notEmpty().trim().isLength({min:8}).withMessage("password length should be 8")
]

const Login = [

   check("Email", "Email is required").notEmpty().trim().isString().isEmail(),
   check("password", "password is required").notEmpty().trim().isLength({min:8}).withMessage("password length should be 8")
]

let validTitle = ["Mr","Mrs", "Miss"];

const createUser = [

    check("Title").notEmpty().isString().trim().isIn(validTitle).withMessage("please Enter Valid title"),
    check("Desc").notEmpty().isString().trim(),
    check("Task").notEmpty().isString().trim(),

]

const result = (req,res,next) => {

     const result = validationResult(req);
     const haserror = !result.isEmpty();

     if(haserror){

        const err = result.array()[0].msg;
        res.send({sucess:false , message:err});
     }

     next();
};


module.exports = {validator,result,Login,createUser};