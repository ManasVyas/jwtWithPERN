const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "jwttutorial",
  port: 5432,
});

module.exports = pool;
