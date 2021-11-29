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

  // Post request to create a new account
  route.post("/create_account", (req, res) => {
    const data = [
      req.body.user_id,
      req.body.account_type,
      req.body.interest_rate,
    ];
    db.query(
      `
        INSERT INTO user_account (user_id, account_type, interest_rate)
          VALUES ($1, $2, $3) RETURNING *;
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

  // Put request to change account details
  route.put("/edit_account", (req, res) => {
    const data = [
      req.body.id,
      req.body.user_id,
      req.body.account_type,
      req.body.interest_rate,
    ];
    db.query(
      `
        UPDATE user_account
        SET user_id = $2,
          account_type = $3,
          interest_rate = $4
        WHERE ID = $1
        RETURNING *;
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

  // Delete account
  route.delete("/delete/:id/:user_id", (req, res) => {
    const data = [req.params.id, req.params.user_id];
    db.query(
      `
        DELETE FROM user_account WHERE id = $1 AND user_id = $2;
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

  return route;
};

module.exports = user_account;
