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
  try {
    const [id] = await db("accounts").insert(user);
    const { username, avatar } = await findByID({ id: id });
    return {
      id,
      username,
      avatar
    };
  } catch (err) {
    console.log(err);
  }
}

function getAccounts() {
  return db.select().from("accounts");
}
