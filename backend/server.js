require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const pool = require("./config/db");
const corsOptions = require('./config/corsOptions.js');
const express = require('express');
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3500;

app.use('/api/v1/auth', require('./routes/authRoutes'));

app.all(/.*/, (req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ message: '404 Not Found', path: req.originalUrl });
  } else {
    res.type('txt').send(`404 Not Found: ${req.originalUrl}`);
  }
});

app.use(errorHandler);

const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL DB connected successfully!");
    client.release();
    return true;
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
    return false;
  }
}

const startServerWithDb = async (retries = 3, delay = 3000) => {
  for (let i = 1; i <= retries; i++) {
    const connected = await checkDbConnection();
    if (connected) {
      const PORT = process.env.PORT || 3500;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      return;
    } else if (i < retries) {
      console.log(`Database Connection failed Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    } else {
      console.error("Database Connection Failed. Program Exits...");
      process.exit(1);
    }
  }
}

startServerWithDb();