const db = require("../data/dbConfig.js");

module.exports = {
  findBy,
  findByID,
  insert,
  getAccounts
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
  await db("accounts").insert(user);
  const { username, avatar, id } = await findBy({
    username: user.username
  }).first();
  return { id, username, avatar };
}

function getAccounts() {
  return db.select().from("accounts");
}
