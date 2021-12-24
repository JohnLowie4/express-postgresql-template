const { response } = require("express");

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
  route.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query(
      `
        SELECT * FROM users WHERE id=$1;
      `,
      [id]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Post request to create new users
  route.post("/create_user", (req, res) => {
    const data = [req.body.first_name, req.body.last_name, req.body.email];
    db.query(
      `
        INSERT INTO users (first_name, last_name, email)
          VALUES ($1, $2, $3) RETURNING *
      `,
      data
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Put request to edit user
  route.put("/edit_user", (req, res) => {
    const data = [
      req.body.id,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
    ];

    db.query(
      `
        UPDATE users
        SET first_name = $2,
          last_name = $3,
          email = $4
        WHERE id = $1
        RETURNING *;
      `,
      data
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Delete user
  route.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
      `
        DELETE FROM users WHERE id=$1;
      `,
      [id]
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

module.exports = users;
