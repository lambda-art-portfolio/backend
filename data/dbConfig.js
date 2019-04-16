const knex = require("knex");
const config = require("../knexfile.js");
const env = process.env.DB_ENV || "development";
console.log(`\n Running ${env} build`);

module.exports = knex(config[env]);
