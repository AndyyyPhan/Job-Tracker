import pool from "../db.js";

export async function getStatuses(req, res) {
  try {
    const result = await pool.query("SELECT id, name FROM statuses ORDER by id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching statuses:", err);
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
}
