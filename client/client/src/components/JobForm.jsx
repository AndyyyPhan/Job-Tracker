import React from "react";
export default function JobForm({ onJobAdded }) {
  const [companyName, setCompanyName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [statusID, setStatusID] = React.useState("1");
  const [applicationDate, setApplicationDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          jobTitle,
          statusID: parseInt(statusID),
          applicationDate,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      const newJob = await response.json();

      setCompanyName("");
      setJobTitle("");
      setStatusID("1");
      setApplicationDate("");
      setNotes("");

      onJobAdded(newJob);
    } catch (err) {
      console.error("Eror adding job:", err);
      alert("Failed to add job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Add New Job</h2>

      <div className="form-group">
        <label htmlFor="company">Company Name *</label>
        <input
          type="text"
          id="company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Job Title *</label>
        <input
          type="text"
          id="title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          value={statusID}
          onChange={(e) => setStatusID(e.target.value)}
          required
        >
          <option value="1">Applied</option>
          <option value="2">Interviewing</option>
          <option value="3">Offer</option>
          <option value="4">Rejected</option>
          <option value="5">Accepted</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Application Date *</label>
        <input
          type="date"
          id="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          values={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
      </div>

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
