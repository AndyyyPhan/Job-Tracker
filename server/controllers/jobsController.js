import pool from "../db.js";

export async function getJobs(req, res) {
  try {
    const result = await pool.query(
      `SELECT
            jobs.id,
            jobs.company_name,
            jobs.job_title,
            jobs.status_id,
            statuses.name as status,
            jobs.application_date,
            jobs.notes,
            jobs.created_at
        FROM jobs JOIN statuses ON jobs.status_id = statuses.id
        ORDER BY jobs.application_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs", details: err.message });
  }
}

export async function addJob(req, res) {
  let { companyName, jobTitle, statusID, applicationDate, notes } = req.body;

  companyName = companyName?.trim();
  jobTitle = jobTitle?.trim();
  notes = notes?.trim();

  if (!companyName || !jobTitle || !statusID || !applicationDate) {
    return res.status(400).json({
      error: "Missing required fields: companyName, jobTitle, statusID, applicationDate",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs (company_name, job_title, status_id, application_date, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [companyName, jobTitle, statusID, applicationDate, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding job:", err.message);
    res.status(500).json({ error: "Failed to add job", details: err.message });
  }
}
