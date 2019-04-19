const router = require("express").Router();
const upload = require("multer")();

const Accounts = require("./model.js");
const restrict = require("../auth/restrict.js");
const generateToken = require("../auth/generateToken.js");

const {
  accountInfoExists,
  prepNewAccount,
  notADuplicate,
  verifyPassword
} = require("./middleware/registerAndLogin.js");
const {
  inputCheckForEditAccount,
  prepUpdateAccount
} = require("./middleware/update.js");

router.post(
  "/register",
  accountInfoExists,
  notADuplicate,
  upload.single("avatarIMG"),
  prepNewAccount,
  async ({ credentials }, res) => {
    try {
      const newAccount = await Accounts.insert(credentials);
      const token = await _getLoginToken(newAccount.username);
      res.status(201).json({ ...newAccount, token });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal server error: registering account" });
    }
  }
);

router.put(
  "/edit/:id",
  restrict,
  inputCheckForEditAccount,
  prepUpdateAccount,
  async ({ params: { id }, updated }, res) => {
    try {
      const newAccObj = await Accounts.update(id, updated);
      delete newAccObj.password;
      res.status(200).json(newAccObj);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal server error: updating account" });
    }
  }
);

router.post(
  "/login",
  accountInfoExists,
  verifyPassword,
  async ({ account }, res) => {
    try {
      const token = await _getLoginToken(account.username);
      res.status(200).json({ ...account, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error: logging in" });
    }
  }
);

async function _getLoginToken(username) {
  try {
    const { id } = await Accounts.findBy({ username }).first();
    return generateToken({ username, id }, "1d");
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
