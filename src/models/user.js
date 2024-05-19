const db = require("../config/db");

const findUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results[0]);
  });
};

module.exports = {
  findUserByUsername,
};
