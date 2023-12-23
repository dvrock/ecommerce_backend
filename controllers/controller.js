const { LoggerModel } = require("../schemas");
const { createCustomError } = require("../utils/error");
module.exports = {
  DataSubmit: async (req, res) => {
    try {
      // console.log("request body", req.body.temp);_
      const form_data = await LoggerModel.bulkCreate(req.body.temp);
      if (form_data) {
        res.json({
          status: 200,
        });
      } else {
        res.json({ message: "error while inserting data in db", status: 500 });
        //406 not acceptable
        throw new createCustomError("error while inserting data in db", 406);
      }
    } catch (err) {
      res.json({ message: err.message, status: 500 });
      throw new createCustomError(err.message, 500);
    }
  },
};
