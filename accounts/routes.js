const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Accounts = require("./model.js");
const generateToken = require("../auth/generateToken.js");

router.post(
  "/register",
  async ({ body: { username, password, avatar } }, res) => {
    if (username && password) {
      try {
        const creditials = {
          username,
          password: bcrypt.hashSync(password, 12)
        };
        creditials.avatar = avatar ? avatar : "https://bit.ly/2GlN9TU";

        const newAccount = await Accounts.insert(creditials);
        res.status(201).json(newAccount);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal server error: registering account" });
      }
    } else {
      console.log("Bad account creation");
      res.status(400).json({ message: "Please include username & password" });
    }
  }
);

router.post("/login", async ({ body: { username, password } }, res) => {
  const { username } = creditials;

  const account = await Accounts.findBy({ username }).first();
  if (bcrypt.hashCompare(creditials.password, account.password)) {
    const token = _getLoginToken(account.username);
    res.status(200).json({ token, username: account.username, id: account.id });
  } else {
    console.log("Bad login");
    res.status(400).json({ message: "Invalid creditials" });
  }

  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error: logging in" });
  }

  const token = generateToken({ username, id }, "1d");
});

module.exports = router;

async function _getLoginToken(username) {
  const { id } = await Accounts.findBy({ username }).first();
  return generateToken({ username, id }, "1d");
}
