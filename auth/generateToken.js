const jwt = require("jsonwebtoken");
const secret = require("./secrets").jwtSecret;

module.exports = (user, exp) => {
  const payload = {
    id: user.id,
    username: user.username
  };
  const options = {
    expiresIn: exp
  };

  return jwt.sign(payload, secret, options);
};
