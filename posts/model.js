const db = require("../dbConfig.js");
const restrict = require("../auth/restrict.js");

module.exports = {
  getBy,
  getAll,
  update,
  remove
};

function getBy(filter) {
  return db("posts").where(filter);
}

function getAll() {
  return db("posts");
}

function update(id, updated) {
  return db("posts")
    .where({ id })
    .update({ ...updated });
}

function remove(id) {
  return db("posts")
    .where({ id })
    .del();
}

async function insert(post) {
  const [id] = await db("posts").insert(post, "id");
  return getBy({ id }).first();
}
