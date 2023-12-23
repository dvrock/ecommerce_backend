const { CredentialsModel } = require("../schemas")
const { createCustomError } = require("../utils/error")
const { Op } = require("sequelize");
const authorizer = async (event, response, callback) => {
  try {
    const authToken = event.headers.Authorization[0] || event.headers.authorization[0];
    if (!authToken) {
      throw Error("UnAuthorize");
    }
    if (usernamePassword.length !== 2) throw Error("UnAuthorize");
    const user_data = await CredentialsModel.findOne({
      where: {
        [Op.and]:
          [
            { user_name: usernamePassword[0] }, { password: usernamePassword[1] }
          ]
      }
    })
    console.log("userdata", user_data)
    if (user_data) {
      console.log(event.body,
        usernamePassword[0])
      event.username = usernamePassword[0]
      callback();
    } else {
      throw new createCustomError("user not exist", 404);

    }
  } catch (error) {
    console.log(error)
    callback('{ status: 401, message: "Unauthorized" }');
  }
};

module.exports = {
  authorizer
}