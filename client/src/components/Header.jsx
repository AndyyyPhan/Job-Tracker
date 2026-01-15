export default function Header({ user, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-600 text-white p-6 md:p-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Job Tracker</h1>
            <p className="text-base md:text-lg opacity-90">
              Manage your job applications
            </p>
          </div>
          {user && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right">
                <p className="text-sm opacity-75">Logged in as</p>
                <p className="text-lg md:text-xl font-semibold">
                  {user.username}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
