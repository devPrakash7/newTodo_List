
const Models = require("../Models/userModels")


const getDetalis = async (req, res) => {

    let queryParams = req.query;

    const { userId, Task } = queryParams;

      const findDetalis = await Models.find(queryParams).sort({Time: -1});

      res.status(200).send({ status: true, msg: findDetalis });


};

module.exports = { getDetalis };