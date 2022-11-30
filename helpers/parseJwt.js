const jwt_decode = require("jwt-decode");

// decode your token - HS256 https://jwt.io/
const decodeToken = (token) => jwt_decode(token);

const parseOrgIdFromToken = (token) => {
  const {
    account: { organization },
  } = decodeToken(token);
  return organization;
};

module.exports = {
  parseOrgIdFromToken,
};
