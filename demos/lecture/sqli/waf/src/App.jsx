import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Terminal, Database, Play, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [activeLevel, setActiveLevel] = useState(1);
  const [input, setInput] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize the in-memory SQL database (alasql) via CDN
  useEffect(() => {
    const initDb = () => {
      if (window.alasql) {
        // Create schema
        window.alasql('CREATE TABLE users (id INT, username STRING, role STRING, flag STRING)');
        // Insert dummy data
        window.alasql('INSERT INTO users VALUES (1, "admin", "admin", "FLAG{sql_1nj3ct10n_m4st3r}")');
        window.alasql('INSERT INTO users VALUES (2, "alice", "user", "Standard user account")');
        window.alasql('INSERT INTO users VALUES (3, "bob", "user", "Standard user account")');
        setDbReady(true);
      }
    };

    if (!window.alasql) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/alasql@4.1.0/dist/alasql.min.js';
      script.onload = initDb;
      document.body.appendChild(script);
    } else {
      initDb();
    }
  }, []);

  // Define the vulnerability levels
  const levels = [
    {
      id: 1,
      name: "Level 1: The Basics",
      description: "Standard login/search query. No input validation or sanitization is applied.",
      queryTemplate: "SELECT * FROM users WHERE username = '{input}'",
      filter: (val) => val,
      filterCode: "const sanitized = input;",
      hint: "Close the initial string quote, append a condition that is always true, and comment out the rest. Example: ' OR '1'='1",
      solution: "' OR '1'='1"
    },
    {
      id: 2,
      name: "Level 2: Case-Sensitive Stripping",
      description: "The developer strips 'OR' and 'AND' to prevent logic bypasses, but forgot that SQL is case-insensitive.",
      queryTemplate: "SELECT * FROM users WHERE username = '{input}'",
      filter: (val) => val.replace('OR', '').replace('AND', ''),
      filterCode: "const sanitized = input.replace('OR', '').replace('AND', '');",
      hint: "What happens if you use lowercase or mixed-case letters for your SQL keywords?",
      solution: "' or '1'='1"
    },
    {
      id: 3,
      name: "Level 3: Naive Regex Replacement",
      description: "The developer uses a case-insensitive regex to strip 'or' and 'and'. However, they only run the replacement once (non-recursively).",
      queryTemplate: "SELECT * FROM users WHERE username = '{input}'",
      filter: (val) => val.replace(/or/ig, '').replace(/and/ig, ''),
      filterCode: "const sanitized = input.replace(/or/ig, '').replace(/and/ig, '');",
      hint: "If the filter removes 'or' from the string 'oORr', what letters are left behind?",
      solution: "' oORr '1'='1"
    },
    {
      id: 4,
      name: "Level 4: Numeric Context",
      description: "This feature searches by User ID (an integer). To be safe, the developer strips all single quotes.",
      queryTemplate: "SELECT * FROM users WHERE id = {input}",
      filter: (val) => val.replace(/'/g, ''),
      filterCode: "const sanitized = input.replace(/'/g, '');",
      hint: "Because the injection point is NOT inside string quotes, you don't need quotes to break out. Just append SQL logic directly.",
      solution: "1 OR 1=1"
    },
    {
      id: 5,
      name: "Level 5: WAF Keyword Denylist",
      description: "A simple Web Application Firewall (WAF) blocks the request entirely if it detects 'OR', 'AND', '=', or 'LIKE'.",
      queryTemplate: "SELECT * FROM users WHERE username = '{input}'",
      filter: (val) => {
        const blocked = ['or', 'and', '=', 'like'];
        const lower = val.toLowerCase();
        for (let w of blocked) {
          if (lower.includes(w)) throw new Error(`WAF Blocked Request: Forbidden keyword '${w}' detected!`);
        }
        return val;
      },
      filterCode: `const blocked = ['or', 'and', '=', 'like'];\nif (blocked.some(w => input.toLowerCase().includes(w))) {\n  throw new Error("WAF Blocked");\n}`,
      hint: "You cannot use '=' to make a true statement, nor 'OR'. Can you use greater-than (>) and compare empty strings to make the statement true?",
      solution: "' > '' --"
    }
  ];

  const currentLevel = levels.find(l => l.id === activeLevel);

  // Calculate live preview safely so it updates as you type and handles WAF errors
  let livePreviewText = '{input}';
  let isLiveBlocked = false;
  if (input) {
    try {
      livePreviewText = currentLevel.filter(input);
    } catch (err) {
      livePreviewText = '[BLOCKED BY WAF]';
      isLiveBlocked = true;
    }
  }

  // Handle level switching
  const handleLevelChange = (id) => {
    setActiveLevel(id);
    setInput('');
    setExecutionResult(null);
    setShowHint(false);
  };

  // Execute the SQL injection payload
  const executeQuery = () => {
    if (!window.alasql) {
      setExecutionResult({ success: false, error: "Database engine is still downloading in the background. Please try again in a moment." });
      return;
    }

    setExecutionResult(null);
    let sanitizedInput = "";
    let finalQuery = "";

    try {
      // 1. Apply the "Bad Remediation" Filter
      sanitizedInput = currentLevel.filter(input);

      // 2. Construct the Final Query
      finalQuery = currentLevel.queryTemplate.replace('{input}', sanitizedInput);

      // 3. Execute against in-memory DB
      const result = window.alasql(finalQuery);

      setExecutionResult({
        success: true,
        sanitizedInput,
        finalQuery,
        data: result
      });
    } catch (err) {
      // Handle WAF throws or SQL syntax errors
      setExecutionResult({
        success: false,
        sanitizedInput,
        finalQuery: finalQuery || "Blocked before query construction.",
        error: err.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Sidebar - Level Selection */}
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-4 text-green-400">
            <ShieldAlert size={28} />
            <h1 className="text-xl font-bold tracking-tight">SQLi Lab</h1>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-2 shadow-xl">
            <h2 className="text-xs uppercase text-gray-500 font-bold mb-2 px-2 mt-2">Scenarios</h2>
            {levels.map(level => (
              <button
                key={level.id}
                onClick={() => handleLevelChange(level.id)}
                className={`w-full text-left px-3 py-2 rounded mb-1 text-sm transition-colors ${
                  activeLevel === level.id
                    ? 'bg-blue-900/50 border border-blue-700/50 text-blue-300'
                    : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-xs text-gray-500">
            <p><strong>Goal:</strong> Extract all records from the database, specifically the admin's FLAG.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 flex flex-col gap-4">

          {/* Scenario Info */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={100} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{currentLevel.name}</h2>
            <p className="text-gray-400 mb-6 max-w-2xl">{currentLevel.description}</p>

            <div className="bg-gray-950 rounded border border-gray-800 p-4 font-mono text-sm mb-4">
              <div className="text-gray-500 mb-1 flex items-center gap-2"><Terminal size={14}/> Backend Filter Logic (Node.js):</div>
              <code className="text-pink-400">{currentLevel.filterCode}</code>
            </div>

            <div className="bg-gray-950 rounded border border-gray-800 p-4 font-mono text-sm">
              <div className="text-gray-500 mb-1 flex items-center gap-2"><Database size={14}/> Live Query Preview:</div>
              <code className="text-blue-400 break-all">
                {currentLevel.queryTemplate.split('{input}')[0]}
                <span className={`font-bold px-1 rounded mx-px ${isLiveBlocked ? 'text-orange-500 bg-orange-950/50 line-through' : 'text-red-400 bg-red-950/50'}`}>
                  {livePreviewText}
                </span>
                {currentLevel.queryTemplate.split('{input}')[1]}
              </code>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-xl">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Input Payload (simulating user input)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && executeQuery()}
                className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                placeholder="Enter injection payload..."
              />
              <button
                onClick={executeQuery}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Play size={16} /> Execute
              </button>
            </div>

            <div className="flex gap-4 mt-4 text-sm">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-yellow-500/80 hover:text-yellow-400 flex items-center gap-1"
              >
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={() => setInput(currentLevel.solution)}
                className="text-green-500/80 hover:text-green-400 flex items-center gap-1"
              >
                <CheckCircle2 size={14} /> Load Solution
              </button>
            </div>

            {showHint && (
              <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded text-yellow-200 text-sm">
                <strong>Hint:</strong> {currentLevel.hint}
              </div>
            )}
          </div>

          {/* Execution Results Area */}
          {executionResult && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Terminal size={18} /> Execution Trace
              </h3>

              <div className="space-y-4">
                {/* Sanitize Trace */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">1. Post-Filter Payload:</div>
                  <div className={`font-mono p-2 rounded border ${executionResult.sanitizedInput !== input ? 'bg-orange-950/30 border-orange-800 text-orange-300' : 'bg-gray-950 border-gray-800 text-gray-300'}`}>
                    {executionResult.sanitizedInput || <span className="text-gray-600 italic">Empty string</span>}
                  </div>
                </div>

                {/* Final Query Trace */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">2. Executed Database Query:</div>
                  <div className="font-mono p-2 rounded bg-gray-950 border border-gray-800 text-blue-400 break-all">
                    {executionResult.finalQuery}
                  </div>
                </div>

                {/* Results/Error */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">3. Database Response:</div>
                  {executionResult.success ? (
                    executionResult.data.length > 0 ? (
                      <div className="overflow-x-auto rounded border border-gray-800">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-950 text-gray-400 border-b border-gray-800">
                            <tr>
                              <th className="p-3">ID</th>
                              <th className="p-3">Username</th>
                              <th className="p-3">Role</th>
                              <th className="p-3">Flag/Data</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {executionResult.data.map((row, i) => (
                              <tr key={i} className={row.role === 'admin' ? 'bg-green-900/20 text-green-400 font-medium' : 'text-gray-300'}>
                                <td className="p-3">{row.id}</td>
                                <td className="p-3">{row.username}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-1 rounded text-xs ${row.role === 'admin' ? 'bg-green-900/50 text-green-300' : 'bg-gray-800'}`}>
                                    {row.role}
                                  </span>
                                </td>
                                <td className="p-3">{row.flag}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-4 rounded bg-gray-950 border border-gray-800 text-gray-400 text-sm flex items-center gap-2">
                        <CheckCircle2 size={16} /> Query executed successfully, but returned 0 rows.
                      </div>
                    )
                  ) : (
                    <div className="p-4 rounded bg-red-950/30 border border-red-900 text-red-400 text-sm flex items-start gap-3">
                      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>Error:</strong> {executionResult.error}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
