const router = require("express").Router();
const bcrypt = require("bcryptjs");
const restrict = require("../auth/restrict.js");

const Accounts = require("./model.js");
const generateToken = require("../auth/generateToken.js");

// Debugging endpoint, delete for final product
router.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.getAccounts();
    res.status(200).json({ accounts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting accounts" });
  }
});

router.put(
  "/edit/:id",
  restrict,
  async ({ params: { id }, body: { username, password, avatar } }, res) => {
    if (username || password || avatar) {
      const updateAcc = {};
      if (username) updateAcc.username = username;
      if (password) updateAcc.password = bcrypt.hashSync(password, 12);
      if (avatar) updateAcc.avatar = avatar;
      try {
        const updated = await Accounts.update(id, updateAcc);
        delete updated.password;
        res.status(200).json(updated);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal server error: updating account" });
      }
    } else {
      console.log("Update w/ no data");
      res.status(400).json({ message: "Please include data to update" });
    }
  }
);

router.post(
  "/register",
  async ({ body: { username, password, avatar } }, res) => {
    if (username && password) {
      try {
        const foundExisting = await Accounts.findBy({ username });
        if (foundExisting.length) {
          console.log("Duplicate account creation attempt");
          res.status(409).json({ message: "Account already exists" });
        } else {
          const creditials = {
            username,
            password: bcrypt.hashSync(password, 12)
          };
          creditials.avatar = avatar ? avatar : "https://bit.ly/2GlN9TU";

          const newAccount = await Accounts.insert(creditials);
          const token = await _getLoginToken(newAccount.username);
          res.status(201).json({ ...newAccount, token });
        }
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
  if (username && password) {
    try {
      const account = await Accounts.findBy({ username }).first();
      if (account && bcrypt.compareSync(password, account.password)) {
        const token = await _getLoginToken(account.username);
        delete account.password;
        res.status(200).json({ ...account, token });
      } else {
        console.log("Bad login");
        res.status(400).json({ message: "Invalid creditials" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error: logging in" });
    }
  } else {
    console.log("Missing username/password");
    res.status(400).json({ message: "Please include a username & password" });
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
