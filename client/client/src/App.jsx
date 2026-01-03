import Header from "./components/Header.jsx";
import JobCard from "./components/JobCard.jsx";
import JobForm from "./components/JobForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import React from "react";

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showSignup, setShowSignup] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);

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

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/jobs", {
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
    setJobs([newJob, ...jobs]);
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
