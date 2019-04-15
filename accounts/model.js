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

function insert(user) {
  return db("accounts")
    .insert(user)
    .then(res =>
      findByID(res[0])
        .then(data => {
          console.log("GOOD PROMISE: ", res, data);
          return {
            id: data.id,
            username: data.username,
            avatar: data.avatar
          };
        })
        .catch(err => console.log("2nd Promise: ", err))
    );

  //const { username, avatar } =findByID(id);
  //return { id, username, avatar };
}

function getAccounts() {
  return db.select().from("accounts");
}
