const apiUrls = {
  base: "https://api-staging.polygonid.com/v1",
  orgs: {
    base: "/orgs",
    create: "/account-management",
    signin: "/sign-in",
    activate: "/account-management/activate",
    refresh: "/account-management/refresh-token",
  },
  issuer: {
    base: "/issuers",
    createSchema: "/schemas",
    offers: "/offers",
    offerQr: "/offers-qrcode",
  },
};

const createUrl = (key, apiName, id) =>
  `${apiUrls.base}${apiUrls[key].base}${apiName ? apiUrls[key][apiName] : ""}`;

const createIssuerSchemaClaimUrl = (orgId, apiName, schemaToCreateClaim) => {
  const claimApiSuffix = schemaToCreateClaim
    ? `/${schemaToCreateClaim}${apiUrls.issuer.offers}`
    : "";
  return `${apiUrls.base}${apiUrls.issuer.base}/${orgId}${apiUrls.issuer[apiName]}${claimApiSuffix}`;
};

const createQrUrl = (claimId) =>
  `${apiUrls.base}${apiUrls.issuer.offerQr}/${claimId}`;

module.exports = {
  apiUrls,
  createUrl,
  createIssuerSchemaClaimUrl,
  createQrUrl,
};
