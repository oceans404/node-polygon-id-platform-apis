const orgInfo = require("../constants/orgInfo");
const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");

const url = createUrl("orgs", "signin");
postRequest(url, orgInfo, {}, writeTokenFile);
