const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("accounts").insert([
    {
      id: 1,
      username: "Foo",
      password: bcrypt.hashSync("Bar", 12),
      avatar: "https://bit.ly/2GnNwi1"
    }
  ]);
};
