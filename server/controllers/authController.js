import pool from "../db.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  let { username, email, password } = req.body;

  username = username.trim();
  email = email.trim();

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error: "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({
      error: "Password must contain uppercase, lowercase, and number.",
    });
  }

  try {
    const existingUserResult = await pool.query(
      `SELECT * FROM users WHERE username = $1 OR email = $2 LIMIT 1`,
      [username, email]
    );

    const existingUser = existingUserResult.rows[0];

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    req.session.userId = result.rows[0].id;
    res.status(201).json({ message: "User registered.", user: result.rows[0] });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
}

export async function loginUser(req, res) {
  let { username, password } = req.body;
  username = username.trim();

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUserResult = await pool.query(
      `SELECT id, password FROM users WHERE username = $1`,
      [username]
    );
    const existingUser = existingUserResult.rows[0];

    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    req.session.userId = existingUser.id;
    res.json({ message: "Logged in", user: existingUser });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
}

export async function logoutUser(req, res) {
  req.session.destroy(() => res.json({ message: "Logged out." }));
}
