const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  usernameSM: process.env.SM_USERNAME,
  passwordSM: process.env.SM_PASSWORD,
  urlSM: process.env.SM_URL,
};
