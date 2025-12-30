import pool from "../db.js";
export async function getCurrentUser(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const { rows } = await pool.query(`SELECT id, username, email FROM users WHERE id = $1`, [
      req.session.userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ error: "Failed to fetch user." });
  }
}
