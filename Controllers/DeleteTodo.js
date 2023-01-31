
const userModel = require("../Models/userSignup");
const Models = require("../Models/userModels");
const jwt = require("jsonwebtoken");

const deleteData = async (req, res) => {

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

  const DeletedUser = await Models.deleteOne(
    { UserId },
    { new: true }
  );

  return res.status(200).send({
    status: true,
    message: "Successfully deleted user details",
    data: DeletedUser,
  });
};

module.exports = { deleteData };
