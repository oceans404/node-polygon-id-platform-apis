const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");
const { issuerInfo } = require("../yourData");

const fs = require("fs");
const tokenPath = "./token.js";

fs.access(tokenPath, fs.F_OK, (err) => {
  if (err) {
    console.error(err);
    console.log(
      'Follow the "Activate Organization Account" instructions in the README to activate your org account before creating an issuer.'
    );
  }

  const { token } = require("../token.js");
  createIssuer(token);
});

const createIssuer = (token) => {
  const url = createUrl("issuer");
  postRequest(
    url,
    issuerInfo,
    { Authorization: `bearer ${token}` },
    writeTokenFile
  );
};
