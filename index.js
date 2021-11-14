// Load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080; // Make sure this port is not in conflict with any other ports
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const router = express.Router();

const app = express();

// PG database connection setup
const { Pool } = require("pg");
const dbParams = require("./src/lib/db");
const db = new Pool(dbParams);
db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// helmet enhances your API's security
app.use(helmet());

// Concise output colored by response status for development use.
// The :status token will be color coded based on server response.
app.use(morgan("dev"));

// sends a message to the default route when app is running
app.get("/", (req, res) => {
  res.send(
    "Express PostgreSQL Template server is running. Please refer to the README.md for reaching correct routes."
  );
});

// Example of using a POST request
app.get("/example", (req, res) => {
  // ---------------- START HERE AND LOOK AT THE SAFARI WEB PAGE: PATH
  res.sendFile("index.html");
});

// Import route handlers
const users = require("./src/routes/users");
const user_phone_number = require("./src/routes/user_phone_number");
const user_account = require("./src/routes/user_account");

// Mount middleware functions to specified path
app.use("/api/users", users(db));
app.use("/api/user_phone_number", user_phone_number(db));
app.use("/api/user_account", user_account(db));

app.listen(PORT, () => {
  console.log(`express-postgresql-template listening on port ${PORT}...`);
});
