import React from "react";
import Header from "./components/Header.jsx";
import JobCard from "./components/JobCard.jsx";
import JobForm from "./components/JobForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Modal from "./components/Modal.jsx";
import EditJobForm from "./components/EditJobForm.jsx";
import StatusFilter from "./components/StatusFilter.jsx";

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showSignup, setShowSignup] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState("all");

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [jobToEdit, setJobToEdit] = React.useState(null);

  React.useEffect(() => {
    checkAuth();
  }, []);

  React.useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async (statusFilter = selectedStatus) => {
    try {
      let url = "http://localhost:8000/api/jobs";
      if (statusFilter && statusFilter !== "all") {
        url += `?status=${statusFilter}`;
      }
      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setJobs([]);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleJobAdded = (newJob) => {
    // setJobs([newJob, ...jobs]);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setJobToEdit(job);
    setIsEditModalOpen(true);
  };

  const handleJobUpdated = () => {
    fetchJobs();
    setJobToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setJobToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (job) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${job.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job.");
      }

      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job. Please try again.");
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchJobs(status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user && showSignup) {
    return (
      <SignupForm
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    );
  }

  if (!user) {
    return (
      <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex gap-6 p-6">
        <div className="w-96">
          <JobForm onJobAdded={handleJobAdded} />
        </div>

        <div className="flex-1">
          <StatusFilter selectedStatus={selectedStatus} onStatusChange={handleStatusChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center p-8">
                No jobs yet. Add your first job above!
              </p>
            ) : (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCancelEdit}>
        {jobToEdit && (
          <EditJobForm
            job={jobToEdit}
            onJobUpdated={handleJobUpdated}
            onCancel={handleCancelEdit}
          />
        )}
      </Modal>
    </main>
  );
}

export default App;
