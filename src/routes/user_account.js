// Initialize a modular and mountable route handler
const route = require("express").Router();

const user_account = (db) => {
  // Get request to the user account table
  route.get("/", (req, res) => {
    db.query(
      `
        SELECT * FROM user_account;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Get request to a specific user's account(s)
  route.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
        SELECT * FROM user_account WHERE user_id=$1;
      `,
      [user_id]
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return route;
};

module.exports = user_account;
