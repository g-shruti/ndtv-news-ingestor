const crypto = require("crypto");

module.exports.generateHash = (data) => {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
};
