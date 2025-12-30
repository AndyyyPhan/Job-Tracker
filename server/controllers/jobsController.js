import pool from "../db.js";

export async function getJobs(req, res) {
  try {
    const userId = req.session.userId;

    let query = `SELECT
                  jobs.id,
                  jobs.company_name,
                  jobs.job_title,
                  jobs.status_id,
                  statuses.name as status,
                  jobs.application_date,
                  jobs.notes,
                  jobs.created_at
                FROM jobs JOIN statuses ON jobs.status_id = statuses.id
                WHERE jobs.user_id = $1`;
    let params = [userId];

    const { status } = req.query;

    if (status) {
      query += " AND jobs.status_id = $2";
      params.push(status);
    }

    query += " ORDER BY jobs.application_date DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs", details: err.message });
  }
}

export async function addJob(req, res) {
  const userId = req.session.userId;

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
    const insertResult = await pool.query(
      `INSERT INTO jobs (company_name, job_title, status_id, application_date, notes, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [companyName, jobTitle, statusID, applicationDate, notes, userId]
    );

    const newJobId = insertResult.rows[0].id;

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
      WHERE jobs.id = $1`,
      [newJobId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding job:", err.message);
    res.status(500).json({ error: "Failed to add job", details: err.message });
  }
}

export async function updateJob(req, res) {
  const userId = req.session.userId;
  let { companyName, jobTitle, statusID, applicationDate, notes } = req.body;
  const jobId = parseInt(req.params.id, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  companyName = companyName?.trim();
  jobTitle = jobTitle?.trim();
  notes = notes?.trim();

  if (!companyName || !jobTitle || !statusID || !applicationDate) {
    return res.status(400).json({
      error: "Missing required fields: companyName, jobTitle, statusID, applicationDate",
    });
  }

  try {
    const updateResult = await pool.query(
      `UPDATE jobs
      SET company_name = $1, job_title = $2, status_id = $3, application_date = $4, notes = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *`,
      [companyName, jobTitle, statusID, applicationDate, notes, jobId, userId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "Job not found or you don't have permission" });
    }

    const result = await pool.query(
      `
      SELECT
        jobs.id,
        jobs.company_name,
        jobs.job_title,
        jobs.status_id,
        statuses.name as status,
        jobs.application_date,
        jobs.notes,
      FROM jobs
      JOIN statuses ON jobs.status_id = statuses.id
      WHERE jobs.id = $1 AND jobs.user_id = $2`,
      [jobId, userId]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating job:", err.message);
    res.status(500).json({ error: "Failed to update job", details: err.message });
  }
}

export async function deleteJob(req, res) {
  const userId = req.session.userId;
  const jobId = parseInt(req.params.id, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }
  try {
    const result = await pool.query("DELETE FROM jobs WHERE id = $1 AND user_id = $2", [
      jobId,
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting job:", err.message);
    res.status(500).json({ error: "Failed to delete job", details: err.message });
  }
}
