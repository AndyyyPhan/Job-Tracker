export default function JobCard({ job, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "applied") return "bg-blue-100 text-blue-700";
    if (statusLower === "interviewing") return "bg-yellow-100 text-yellow-700";
    if (statusLower === "offer") return "bg-orange-100 text-orange-700";
    if (statusLower === "rejected") return "bg-red-100 text-red-700";
    if (statusLower === "accepted") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the ${job.company_name} application?`)) {
      onDelete(job);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.company_name}</h2>
      <h3 className="text-lg text-gray-600 mb-4">{job.job_title}</h3>
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-semibold text-gray-700">Date Applied:</span>{" "}
          {formatDate(job.application_date)}
        </div>
        {job.notes && (
          <div>
            <span className="font-semibold text-gray-700">Notes:</span> {job.notes}
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
