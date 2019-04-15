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
        const token = await _getLoginToken(newAccount.username);
        res.status(201).json({ ...newAccount, token });
      } catch (err) {
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
  try {
    const account = await Accounts.findBy({ username }).first();
    if (account && bcrypt.compareSync(password, account.password)) {
      const token = await _getLoginToken(account.username);
      res.status(200).json({ token });
    } else {
      console.log("Bad login");
      res.status(400).json({ message: "Invalid creditials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error: logging in" });
  }
});

async function _getLoginToken(username) {
  try {
    const { id } = await Accounts.findBy({ username }).first();
    return generateToken({ username, id }, "1d");
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
