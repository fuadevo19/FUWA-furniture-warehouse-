const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../models/user");

const login = (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, "your-secret-key", { expiresIn: "1h" });
    return res.json({ token });
  });
};

module.exports = {
  login,
};
