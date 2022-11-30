require("dotenv").config();

const email = process.env.POLYGON_ID_EMAIL;
const password = process.env.POLYGON_ID_PASSWORD;

module.exports = {
  email,
  password,
};
