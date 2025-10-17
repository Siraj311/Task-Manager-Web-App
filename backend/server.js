require('dotenv').config();
const pool = require("./config/db");
const express = require('express');
const app = express();

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
})