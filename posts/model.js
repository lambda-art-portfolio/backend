const db = require("../data/dbConfig.js");

module.exports = {
  getBy,
  getAll,
  update,
  remove,
  insert
};

function getBy(filter) {
  const postFilter = {};
  for (let key in filter) {
    postFilter[`p.${key}`] = filter[key];
  }
  return db
    .select(
      "u.username",
      "u.avatar",
      "p.id",
      "p.picture",
      "p.description",
      "p.upvotes"
    )
    .from("posts as p")
    .where(postFilter)
    .join("accounts as u", { "u.id": "p.user_id" });
}

function getAll() {
  return db
    .select("u.username", "p.picture", "p.id", "p.description", "p.upvotes")
    .from("posts as p")
    .join("accounts as u", { "u.id": "p.user_id" });
}

async function update(id, updated) {
  await db("posts")
    .where({ id })
    .update({ ...updated });

  return getBy({ id }).first();
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
