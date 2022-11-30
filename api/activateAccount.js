const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");

const fs = require("fs");

const tokenPath = "./token.js";

fs.access(tokenPath, fs.F_OK, (err) => {
  if (err) {
    console.error(err);
    console.log(
      'Follow the "Sign-in to an Organization Account" instructions in the README to sign in before activating your org account.'
    );
  }

  const { token } = require("../token.js");
  activateAccount(token);
});

const activateAccount = (token) => {
  const url = createUrl("orgs", "activate");
  postRequest(url, {}, { Authorization: `bearer ${token}` }, writeTokenFile);
};
