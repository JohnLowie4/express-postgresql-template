// Initialize a modular and mountable route handler
const route = require("express").Router();

const users = (db) => {
  // Get request to the users table
  route.get("/", (req, res) => {
    db.query(
      `
        SELECT * FROM users;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Get request to a specific user
  route.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
        SELECT * FROM users WHERE id=$1;
      `,
      [user_id]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return route;
};

module.exports = users;
