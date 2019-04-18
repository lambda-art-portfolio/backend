const upload = require("multer")();
const bcrypt = require("bcryptjs");

const Accounts = require("../model.js");

module.exports = {
  accountInfoExists,
  prepNewAccount,
  notADuplicate,
  verifyPassword
};

function accountInfoExists({ body: { username, password } }, res, next) {
  if (username && password) {
    next();
  } else {
    console.log("Bad account create/login");
    res.status(400).json({ message: "Please include username & password" });
  }
}

async function notADuplicate({ body: { username } }, res, next) {
  try {
    const foundExisting = await Accounts.findBy({ username });
    if (foundExisting.length) {
      console.log("Duplicate account creation attempt");
      res.status(409).json({ message: "Account already exists" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Could not complete account creation request" });
  }
}

function prepNewAccount(req, res, next) {
  const {
    body: { username, password, avatar },
    file
  } = req;
  const credentials = {
    username,
    password: bcrypt.hashSync(password, 12)
  };
  if (file) {
    credentials.avatar_img = file;
  } else {
    credentials.avatar = avatar ? avatar : "https://bit.ly/2GlN9TU";
  }
  req.credentials = { ...credentials };
  next();
}

async function verifyPassword(req, res, next) {
  const {
    body: { username, password }
  } = req;
  const account = await Accounts.findBy({ username }).first();
  if (account && bcrypt.compareSync(password, account.password)) {
    delete account.password;
    req.account = account;
    next();
  } else {
    console.log("Bad login");
    res.status(400).json({ message: "Invalid creditials" });
  }
}
