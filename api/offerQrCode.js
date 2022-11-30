const { postRequest } = require("./apiRequest");
const { createQrUrl } = require("../constants/apiUrls");

const offerQrCode = (claimId) => {
  const url = createQrUrl(claimId);
  postRequest(url, null, null, () =>
    console.log(
      `Claim your offer: https://platform-test.polygonid.com/claim-link/${claimId}`
    )
  );
};

module.exports = {
  offerQrCode,
};
