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
    <main>
      <Header />
      <JobForm onJobAdded={handleJobAdded} />
      {jobs.length === 0 ? (
        <p>No jobs yet. Add your first job above!</p>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </main>
  );
}

export default App;
