exports.up = function(knex) {
  return knex.schema
    .createTable("accounts", tbl => {
      tbl.increments();

      tbl
        .string("username", 128)
        .unique()
        .notNullable();

      tbl.string("password", 128).notNullable();

      tbl.string("avatar", 128);
    })
    .createTable("posts", tbl => {
      tbl.increments();

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("accounts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.string("picture", 128).notNullable();

      tbl.string("description", 128);

      tbl.integer("upvotes", 128).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("accounts");
};
