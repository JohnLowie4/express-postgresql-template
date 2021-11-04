// Load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080; // Make sure this port is not in conflict with any other ports
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// PG database connection setup
const { Pool } = require("pg");
const dbParams = require("./src/lib/db");
const db = new Pool(dbParams);
db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// helmet enhances your API's security
app.use(helmet());

// Concise output colored by response status for development use.
// The :status token will be color coded based on server response.
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("It is working");
});

app.listen(PORT, () => {
  console.log(`express-postgresql-template listening on port ${PORT}...`);
});
