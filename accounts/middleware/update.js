module.exports = {
  inputCheckForEditAccount,
  prepUpdateAccount
};

function inputCheckForEditAccount(
  { body: { username, password, avatar } },
  res,
  next
) {
  if (!username && !password && !avatar) {
    console.log("Update w/ no data");
    res.status(400).json({ message: "Please include data to update" });
  } else {
    console.log("Good update check");
    next();
  }
}

function prepUpdateAccount(req, res, next) {
  const {
    body: { username, password, avatar }
  } = req;
  const updateAcc = {};
  if (username) updateAcc.username = username;
  if (password) updateAcc.password = bcrypt.hashSync(password, 12);
  if (avatar) updateAcc.avatar = avatar;
  req.updated = { ...updateAcc };
  next();
}
