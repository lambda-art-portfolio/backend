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

router.post("/login", async({ body: { username, password } }, res));
module.exports = router;

function _logUserIn(creditials) {
  const { username, id } = creditials;

  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error: logging in" });
  }

  const token = generateToken({ username, id }, "1d");
}
