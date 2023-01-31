
const Models = require("../Models/userModels");
const userModel = require("../Models/userSignup");
const jwt = require("jsonwebtoken");

const updateData = async (req, res) => {

  
  let requestBody = req.body;
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
  

  const { Time, Task, Desc, Title } = requestBody;

  const user = await userModel.findById(UserId);

  if (!user) {
    return res.status(400).send({ status: false, msg: "No such data found" });
  }


  const updatedUser = await Models.findOneAndUpdate(
    { UserId  },
    requestBody,
    { new: true}
  );

  return res.status(200).send({
    status: true,
    message: "Successfully updated user details",
    data: updatedUser,
  });
};

module.exports = { updateData };
