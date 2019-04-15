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
  const [id] = await db("accounts").insert(user, "id");
  const { username, avatar } = await findByID({ id });
  return { id, username, avatar };
}

function getAccounts() {
  return db.select().from("accounts");
}
