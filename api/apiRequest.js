const axios = require("axios");
require("dotenv").config();

const postRequest = (url, data = {}, headers = {}, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "application/json",
      ...headers,
    },
  };

  axios
    .post(url, data, config)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log("Body:", res.data);
      if (cb) {
        cb(res.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  postRequest,
};
