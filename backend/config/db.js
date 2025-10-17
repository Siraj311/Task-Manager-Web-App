const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("DB connected successfully!");
    client.release();
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
  }
}

checkConnection();

module.exports = pool;