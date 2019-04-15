const db = require("../data/dbConfig.js");

module.exports = {
  findBy,
  findByID,
  insert,
  getAllAccounts
};

function findBy(filter) {
  return db("accounts").where(filter);
}

function findByID(id) {
  return db("accounts")
    .where({ id })
    .first();
}

async function insert(user) {
  console.log(user);
  const [id] = await db("accounts").insert(user);
  const { username, avatar } = await findByID(id);
  return { id, username, avatar };
}

function getAllAccounts() {
  return db("accounts");
}
