import React, { useState, useEffect } from 'react';
import { ShieldAlert, User, Database, Cookie, Terminal, AlertTriangle, Key } from 'lucide-react';

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/login');
  const [sessionCookie, setSessionCookie] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [executedQuery, setExecutedQuery] = useState('');
  const [dbError, setDbError] = useState('');

  // 1. Load the in-browser SQL engine (AlaSQL) to simulate the backend database
  useEffect(() => {
    if (window.alasql) {
      initDb();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/alasql@4';
    script.async = true;
    script.onload = initDb;
    document.body.appendChild(script);
  }, []);

  const initDb = () => {
    window.alasql('CREATE TABLE IF NOT EXISTS users (id INT, username STRING, password STRING, session_id STRING)');
    window.alasql('DELETE FROM users'); // Clear on hot-reloads
    window.alasql("INSERT INTO users VALUES (1, 'admin', 'supersecret', 'admin_session_789')");
    window.alasql("INSERT INTO users VALUES (2, 'alice', 'password123', 'alice_session_123')");
    window.alasql("INSERT INTO users VALUES (3, 'bob', 'qwerty', 'bob_session_456')");
    setDbLoaded(true);
  };

  // 2. Simulate standard login behavior (Setting a legitimate cookie)
  const handleLogin = (username, expectedCookie) => {
    setSessionCookie(expectedCookie);
    setCurrentRoute('/profile');
  };

  const handleLogout = () => {
    setSessionCookie('');
    setCurrentRoute('/login');
    setQueryResult(null);
    setExecutedQuery('');
    setDbError('');
  };

  // 3. The Vulnerable Action: Loading the profile using the cookie
  useEffect(() => {
    if (currentRoute === '/profile' && dbLoaded) {
      if (!sessionCookie) {
        setQueryResult(null);
        setExecutedQuery('No session cookie provided.');
        setDbError('');
        return;
      }

      // --- THE VULNERABILITY ---
      // We directly concatenate the sessionCookie state into our SQL string
      const vulnerableQuery = `SELECT username FROM users WHERE session_id = '${sessionCookie}'`;
      setExecutedQuery(vulnerableQuery);
      setDbError('');

      try {
        // Execute the query against our client-side database
        const result = window.alasql(vulnerableQuery);
        setQueryResult(result);
      } catch (err) {
        setQueryResult(null);
        setDbError(err.message);
      }
    }
  }, [currentRoute, sessionCookie, dbLoaded]);

  if (!dbLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-600 font-mono">
        Initializing simulated SQL database...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans flex flex-col items-center">
      <div className="max-w-4xl w-full grid grid-cols-1 gap-6">

        {/* --- HEADER --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="text-red-500" />
              Cookie-Based SQLi Demonstration
            </h1>
            <p className="text-slate-500 text-sm mt-1">A vulnerable web application for educational purposes.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentRoute('/login')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentRoute === '/login' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              /login
            </button>
            <button
              onClick={() => setCurrentRoute('/profile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentRoute === '/profile' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              /profile
            </button>
          </div>
        </div>

        {/* --- MAIN APPLICATION WINDOW --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-slate-200 px-4 py-2 text-xs font-mono flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-slate-400">Application View - {currentRoute}</span>
          </div>

          <div className="p-8 min-h-[300px]">
            {currentRoute === '/login' && (
              <div className="max-w-sm mx-auto text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-blue-600 w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">User Login</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => handleLogin('alice', 'alice_session_123')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Login as Alice
                  </button>
                  <button
                    onClick={() => handleLogin('bob', 'bob_session_456')}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Login as Bob
                  </button>
                </div>
              </div>
            )}

            {currentRoute === '/profile' && (
              <div className="max-w-2xl mx-auto">
                {!sessionCookie ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800">Not Logged In</h2>
                    <p className="text-slate-500 mt-2">No session cookie detected. Please log in first.</p>
                  </div>
                ) : dbError ? (
                  <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-red-800">
                    <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      500 Internal Server Error
                    </h2>
                    <p className="font-mono text-sm break-all">{dbError}</p>
                    <p className="mt-4 text-sm opacity-80">This raw database error is visible because the application lacks proper error handling.</p>
                  </div>
                ) : queryResult && queryResult.length > 0 ? (
                  <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 border border-green-100">
                      <User className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                      Welcome, <span className="text-green-600">{queryResult[0].username}</span>!
                    </h2>
                    <p className="text-slate-600 mb-6">You have successfully authenticated via your session cookie.</p>

                    {/* Display extra columns if UNION attack used */}
                    {Object.keys(queryResult[0]).length > 1 && (
                      <div className="mt-6 text-left bg-white p-4 rounded-lg shadow-sm border border-red-200">
                        <h3 className="text-red-600 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-1"><Key className="w-4 h-4"/> Extracted Data Detected</h3>
                        <pre className="text-xs text-slate-700 overflow-x-auto">
                          {JSON.stringify(queryResult, null, 2)}
                        </pre>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="mt-6 text-sm text-slate-500 hover:text-slate-800 underline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800">Invalid Session</h2>
                    <p className="text-slate-500 mt-2">The provided session cookie did not match any active users.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- ATTACKER DASHBOARD (DEVTOOLS SIMULATION) --- */}
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden text-slate-300">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-sm text-emerald-400 font-bold tracking-wide uppercase">DevTools</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cookie Editor */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-2">
                <Cookie className="w-4 h-4" />
                Browser Cookie: <code className="text-emerald-300">session_id</code>
              </label>
              <input
                type="text"
                value={sessionCookie}
                onChange={(e) => setSessionCookie(e.target.value)}
                placeholder="Empty cookie..."
                className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Database Query Viewer */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-2">
                <Database className="w-4 h-4" />
                Executed SQL Query on Server
              </label>
              <div className="bg-black border border-slate-700 rounded-md p-4 min-h-[100px] flex items-start">
                {executedQuery ? (
                  <code className="text-emerald-400 font-mono text-sm break-all leading-relaxed">
                    {/* Highlight the injected part if it exists to help visualize */}
                    SELECT username FROM users WHERE session_id = '<span className="text-red-400 bg-red-900/30 px-1 rounded">{sessionCookie}</span>'
                  </code>
                ) : (
                  <code className="text-slate-600 font-mono text-sm">No query executed yet.</code>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
