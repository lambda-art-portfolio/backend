const db = require("../dbConfig.js");
const restrict = require("../auth/restrict.js");

module.exports = {
  getBy,
  update,
  remove
};

function getBy(filter) {
  return db("posts").where(filter);
}

function update(id, newInfo) {
  return db("posts")
    .where({ id })
    .update({ ...newInfo });
}

function remove(id) {
  return db("posts")
    .where({ id })
    .del();
}

async function insert(post) {
  const [id] = await db("accounts").insert(post, "id");
  return getBy({ id }).first();
}
