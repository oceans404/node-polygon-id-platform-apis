const { postRequest } = require("./apiRequest");
const { createIssuerSchemaClaimUrl } = require("../constants/apiUrls");
const { claimOffer } = require("../yourData");
const { parseOrgIdFromToken } = require("../helpers/parseJwt");
const { offerQrCode } = require("./offerQrCode");

const fs = require("fs");
const tokenPath = "./token.js";

fs.access(tokenPath, fs.F_OK, (err) => {
  if (err) {
    console.error(err);
    console.log(
      'Follow the "Activate Organization Account" instructions in the README to activate your org account before creating an issuer.'
    );
  }
  createClaim();
});

const createClaim = () => {
  const { token } = require("../token.js");
  const orgId = parseOrgIdFromToken(token);
  const url = createIssuerSchemaClaimUrl(
    orgId,
    "createSchema",
    claimOffer.schemaId
  );
  postRequest(
    url,
    claimOffer.claimPayload,
    {
      Authorization: `bearer ${token}`,
    },
    ({ id }) => offerQrCode(id)
  );
};
