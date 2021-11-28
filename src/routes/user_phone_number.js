// Initialize a modular and mountable route handler
const route = require("express").Router();

const user_phone_number = (db) => {
  // Get request to the phone number table
  route.get("/", (req, res) => {
    db.query(
      `
        SELECT * FROM user_phone_number;
      `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        res.json(error.message);
      });
  });

  // Get request to a specific user's phone number(s)
  route.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
        SELECT * FROM user_phone_number WHERE user_id=$1;
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

  // Create new phone number for existing user
  route.post("/create", (req, res) => {
    const data = [
      req.body.user_id,
      req.body.phone_number,
      req.body.number_type,
    ];
    db.query(
      `
        INSERT INTO user_phone_number (user_id, phone_number, number_type)
          VALUES ($1, $2, $3) RETURNING *;
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

  // Edit existing phone number
  route.put("/edit", (req, res) => {
    const data = [
      req.body.id,
      req.body.user_id,
      req.body.phone_number,
      req.body.number_type,
    ];
    db.query(
      `
        UPDATE user_phone_number
          SET phone_number = $3,
            number_type = $4
          WHERE id = $1 AND user_id = $2
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

  // Deletes an existing phone number
  // Make sure id and user_id are correct
  route.delete("/delete/:id/:user_id", (req, res) => {
    db.query(
      `
        DELETE FROM user_phone_number WHERE id=$1 AND user_id=$2
      `,
      [req.params.id, req.params.user_id]
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

module.exports = user_phone_number;
