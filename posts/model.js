const db = require("../data/dbConfig.js");

module.exports = {
  getBy,
  getAll,
  update,
  remove,
  insert
};

function getBy(filter) {
  return db("posts").where(filter);
}

function getAll() {
  return db
    .select("u.username", "p.picture", "p.description", "p.upvotes")
    .from("posts as p")
    .join("accounts as u", { "u.id": "p.user_id" });
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
