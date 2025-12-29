export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="job-card">
      <h2>Company: {job.company_name}</h2>
      <h3>Job Title: {job.job_title}</h3>
      <p>
        <strong>Status:</strong> {job.status}
      </p>
      <p>
        <strong>Date Applied:</strong> {formatDate(job.application_date)}
      </p>
      <p>
        <strong>Notes:</strong> {job.notes}
      </p>
    </div>
  );
}
