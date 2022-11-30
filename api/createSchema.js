const { postRequest } = require("./apiRequest");
const { createIssuerSchemaClaimUrl } = require("../constants/apiUrls");
const { schemaStructure } = require("../yourData");
const { parseOrgIdFromToken } = require("../helpers/parseJwt");

const fs = require("fs");
const tokenPath = "./token.js";

fs.access(tokenPath, fs.F_OK, (err) => {
  if (err) {
    console.error(err);
    console.log(
      'Follow the "Activate Organization Account" instructions in the README to activate your org account before creating an issuer.'
    );
  }
  createSchema();
});

const createSchema = () => {
  const { token } = require("../token.js");
  const orgId = parseOrgIdFromToken(token);
  const url = createIssuerSchemaClaimUrl(orgId, "createSchema");
  postRequest(url, schemaStructure, { Authorization: `bearer ${token}` });
};
