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
  const newAcc = await db("accounts").insert(user);
  const fullNewAcc = await findByID(newAcc[0]);
  return {
    id: newAcc.id,
    username: fullNewAcc.username,
    avatar: fullNewAcc.avatar
  };
}

function getAccounts() {
  return db.select().from("accounts");
}
