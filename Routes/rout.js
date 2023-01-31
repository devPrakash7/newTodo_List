
const express = require("express");
const router = express.Router();
const userSignup = require("../Controllers/userSignup");
const userLogin = require("../Controllers/Login");
const {createUser,Login,validator,result} = require("../validations/validator");
const usercreate = require("../Controllers/createTodo");
const Auth = require("../middleware/Auth");
const GetData = require("../Controllers/getTodo");
const updateuser = require("../Controllers/updateTodo")
const deleteUser = require("../Controllers/DeleteTodo")


// user Register routes
router.post("/api/SignUp" , validator, result  ,userSignup.Signup) ;
router.post("/api/Login" , Login,result, userLogin.Login);


// user creates routess
router.post("/api/createUser" , Auth.userAuth , createUser,result  , usercreate.createUser);
router.get("/api/getData" , Auth.userAuth , GetData.getDetalis);
router.put("/api/userUpdate", Auth.userAuth ,updateuser.updateData)
router.delete("/api/userDelete", Auth.userAuth ,deleteUser.deleteData)


module.exports = router;