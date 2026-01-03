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
    <form className="bg-white rounded-lg shadow-md p-6 sticky top-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Job</h2>

      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          value={statusID}
          onChange={(e) => setStatusID(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
          required
        >
          <option value="1">Applied</option>
          <option value="2">Interviewing</option>
          <option value="3">Offer</option>
          <option value="4">Rejected</option>
          <option value="5">Accepted</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
          Application Date
        </label>
        <input
          type="date"
          id="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          values={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-vertical"
        />
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
