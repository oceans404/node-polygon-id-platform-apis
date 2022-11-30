const orgInfo = require("../constants/orgInfo");
const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");

const url = createUrl("orgs", "create");

postRequest(url, orgInfo);
