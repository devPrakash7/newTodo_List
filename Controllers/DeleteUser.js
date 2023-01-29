
const { Model } = require("mongoose");
const Models = require("../Models/userModels");

const deleteData = async (req, res) => {

  let userIdFromToken = req.userId;

  let tokenId = req.params.Id;

  let user = await Models.findOne({ _id: tokenId });

  if (!user) {
    return res.status(400).send({ status: false, msg: "No such blog found" });
  }

  if (user.userId.toString() !== userIdFromToken) {
    res.status(401).send({
      status: false,
      message: `Unauthorized access user's info doesn't match`,
    });
    return;
  }

  const DeletedUser = await Models.deleteOne(
    { _id: tokenId },
    { new: true , deletedAt: Date.now() }
  );

  return res.status(200).send({
    status: true,
    message: "Successfully updated user details",
    data: DeletedUser,
  });
};

module.exports = { deleteData };
