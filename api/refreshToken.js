const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");

const fs = require("fs");
const tokenPath = "./token.js";

fs.access(tokenPath, fs.F_OK, (err) => {
  if (err) {
    const debugMsg =
      'Follow the "Activate Organization Account" instructions in the README to activate your org account before creating an issuer.';
    console.error(err);
    console.log(debugMsg);
  }

  const { token } = require("../token.js");
  refreshToken(token);
});

const refreshToken = (token) => {
  const url = createUrl("orgs", "refresh");
  postRequest(url, {}, { Authorization: `bearer ${token}` }, writeTokenFile);
};
