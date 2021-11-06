// Initialize a modular and mountable route handler
const route = require("express").Router();

const users = (db) => {
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

  route.get("/:id", (req, res) => {
    const user_id = req.params.id;
    db.query(
      `
        SELECT * FROM users WHERE id = $1
      `,
      [user.id]
    )
      .then((reponse) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });
  return route;
};

module.exports = users;
