const knex = require("knex");
const config = require("../knexfile.js");
const env = process.env.DB_ENV || "production";

module.exports = knex(config[env]);
