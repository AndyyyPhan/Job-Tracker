import Header from "./components/Header.jsx";
import JobCard from "./components/JobCard.jsx";
import JobForm from "./components/JobForm.jsx";
import React from "react";

function App() {
  const [jobs, setJobs] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8000/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJobs(data);
      });
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex gap-6 p-6">
        <div className="w-96">
          <JobForm onJobAdded={handleJobAdded} />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center p-8">
                No jobs yet. Add your first job above!
              </p>
            ) : (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
