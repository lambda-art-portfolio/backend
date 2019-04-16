const db = require("../data/dbConfig.js");

module.exports = {
  findBy,
  findByID,
  insert,
  update,
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
  const { username, avatar } = await findByID(id);
  return { id, username, avatar };
}

function update(id, updated) {
  return db("accounts")
    .where({ id })
    .update({ ...updated });
}

function getAccounts() {
  return db.select("id", "username", "avatar").from("accounts");
}
