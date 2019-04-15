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
  const accID = await db("accounts").insert(user);
  const id = accID[0];
  console.log(id);
  const fullNewAcc = await findByID({ id: id });
  console.log(id, fullNewAcc);
  return {
    id,
    username: fullNewAcc.username,
    avatar: fullNewAcc.avatar
  };
}

function getAccounts() {
  return db.select().from("accounts");
}
