const fs = require("fs");

const tokenJsFileContent = (token) => `const token="${token}"; 

module.exports = {
    token,
};`;

const writeTokenFile = async (data) => {
  fs.writeFile("./token.js", tokenJsFileContent(data.token), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  writeTokenFile,
};
