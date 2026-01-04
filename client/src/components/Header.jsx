export default function Header({ user, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-600 text-white p-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Job Tracker</h1>
            <p className="text-lg opacity-90">Manage your job applications</p>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-75">Logged in as</p>
                <p className="text-xl font-semibold">{user.username}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
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
