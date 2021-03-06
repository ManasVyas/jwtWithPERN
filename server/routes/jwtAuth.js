const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// register
router.post("/register", validInfo, async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    const user = await pool.query("select * from users where user_email = $1", [
      user_email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists!");
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(user_password, salt);
    const newUser = await pool.query(
      "insert into users (user_name, user_email, user_password) values ($1, $2, $3) returning *",
      [user_name, user_email, bcryptPassword]
    );
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//login
router.post("/login", validInfo, async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await pool.query("select * from users where user_email = $1", [
      user_email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect!");
    }
    const validatePassword = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!validatePassword) {
      return res.status(401).json("Password or Email is incorrect!");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verify", authorization, validInfo, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
