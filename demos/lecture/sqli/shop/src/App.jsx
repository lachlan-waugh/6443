import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, LogOut, Lock, User, AlertCircle, Database } from 'lucide-react';

// --- Educational Component: Live SQL Parser & Viewer ---
// Dynamically styles SQL queries to highlight user input and visually "deactivate" commented code
function LiveQueryViewer({ title, template, inputs, className = "" }) {
  let hasHitComment = false;

  const renderedSegments = template.map((tempStr, i) => {
    const isLast = i === template.length - 1;
    const inputStr = isLast ? '' : (inputs[i] || '');

    const processText = (text, isInput) => {
      if (!text) return null;

      // If we've already hit a comment earlier in the query, everything is dead code
      if (hasHitComment) {
        return (
          <span key={`comment-${i}-${isInput}`} className={isInput ? "text-gray-600 bg-gray-800/50 px-1 rounded line-through italic" : "text-gray-600 line-through italic"}>
            {text}
          </span>
        );
      }

      // Check if this specific segment introduces a SQL comment
      const cIdx = text.indexOf('--');
      if (cIdx !== -1) {
        hasHitComment = true;
        const before = text.substring(0, cIdx);
        const after = text.substring(cIdx);
        return (
          <React.Fragment key={`split-${i}-${isInput}`}>
            {before && <span className={isInput ? "text-red-400 font-bold bg-red-900/30 px-1 rounded" : ""}>{before}</span>}
            {after && <span className={isInput ? "text-gray-500 bg-gray-800/50 px-1 rounded line-through italic" : "text-gray-500 line-through italic"}>{after}</span>}
          </React.Fragment>
        );
      }

      // Normal active code/input
      return <span key={`normal-${i}-${isInput}`} className={isInput ? "text-red-400 font-bold bg-red-900/30 px-1 rounded" : ""}>{text}</span>;
    };

    return (
      <React.Fragment key={`segment-${i}`}>
        {processText(tempStr, false)}
        {!isLast && processText(inputStr, true)}
      </React.Fragment>
    );
  });

  return (
    <div className={`bg-gray-900 text-green-400 font-mono text-xs sm:text-sm p-4 overflow-x-auto border-gray-800 ${className}`}>
      <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">{title}</div>
      <div className="whitespace-nowrap">
        {renderedSegments}
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState(null);

  // Dynamically load the AlaSQL library from CDN to bypass bundler issues
  // and initialize the true in-memory SQL database.
  useEffect(() => {
    const initDB = () => {
      try {
        // Reset tables in case of hot-reloads
        window.alasql('DROP TABLE IF EXISTS users');
        window.alasql('DROP TABLE IF EXISTS products');

        // Create and populate Users table
        window.alasql('CREATE TABLE users (username STRING, password STRING)');
        window.alasql("INSERT INTO users VALUES ('shopper', 'password123'), ('admin', 'adminpass')");

        // Create and populate Products table
        window.alasql('CREATE TABLE products (id INT, name STRING, price NUMBER, category STRING, description STRING)');
        window.alasql(`INSERT INTO products VALUES
          (1, 'Wireless Ergonomic Mouse', 29.99, 'Accessories', 'Smooth, comfortable, and battery-efficient wireless mouse.'),
          (2, 'Mechanical Keyboard', 89.50, 'Accessories', 'Tactile clicky keys with customizable RGB backlighting.'),
          (3, 'Noise-Cancelling Headphones', 199.99, 'Audio', 'Over-ear headphones with active noise cancellation and 30hr battery.'),
          (4, '27-inch 4K Monitor', 349.00, 'Displays', 'Crisp, vibrant display perfect for gaming or productivity.'),
          (5, 'Ergonomic Office Chair', 215.00, 'Furniture', 'Lumbar support and adjustable height for all-day comfort.'),
          (6, 'Adjustable Standing Desk', 450.00, 'Furniture', 'Motorized sit-to-stand desk with memory presets.'),
          (7, 'Portable Bluetooth Speaker', 55.00, 'Audio', 'Waterproof, rugged speaker with deep bass.'),
          (8, 'Smart Coffee Maker', 120.00, 'Home', 'Brew your morning coffee using your smartphone.')
        `);
        setDbReady(true);
      } catch (err) {
        console.error("Failed to initialize DB:", err);
        setDbError(err.message);
      }
    };

    if (window.alasql) {
      initDB();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/alasql@4';
      script.onload = initDB;
      script.onerror = () => setDbError("Failed to load SQL engine from CDN.");
      document.head.appendChild(script);
    }
  }, []);

  // Filter products based on the search query using VULNERABLE SQL
  const searchResults = useMemo(() => {
    if (!dbReady) return { data: [], error: null };

    try {
      if (!searchQuery.trim()) {
        return { data: window.alasql('SELECT * FROM products'), error: null };
      }

      // VULNERABLE TO SQL INJECTION: Direct string concatenation
      const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%' OR category LIKE '%${searchQuery}%'`;

      console.log(`Executing Search SQL:\nSELECT * FROM products WHERE name LIKE '%[ ${searchQuery} ]%' OR description LIKE '%[ ${searchQuery} ]%' OR category LIKE '%[ ${searchQuery} ]%'`);

      const result = window.alasql(query);
      return { data: result, error: null };
    } catch (error) {
      // Expose SQL errors instead of crashing so students can debug their injections
      console.error("SQL Syntax Error (Expected during injection):", error);
      return { data: [], error: error.message };
    }
  }, [searchQuery, dbReady]);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSearchQuery('');
    setCartCount(0);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  if (dbError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 p-4 text-center">
        <div>
          <Database size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2">Database Initialization Error</h2>
          <p>{dbError}</p>
        </div>
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <Database size={32} className="text-blue-500 mb-4 animate-bounce" />
          <p className="text-gray-500 font-medium">Booting in-memory SQL engine...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show the Login screen
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // If logged in, show the Shop screen
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <ShoppingCart size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">TechStore</span>
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 max-w-2xl px-8 hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products... (Try injecting SQL!)"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 border-r pr-4 border-gray-200">
                <User size={16} />
                <span>Hi, <strong className="text-gray-900">{currentUser}</strong></span>
              </div>

              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Log out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? 'Search Results' : 'All Products'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {searchResults.error ? 'Query Failed' : `Showing ${searchResults.data.length} ${searchResults.data.length === 1 ? 'item' : 'items'}`}
            </p>
          </div>
        </div>

        {/* Educational Live Query Viewer */}
        <LiveQueryViewer
          className="mb-6 rounded-lg shadow-inner border"
          title="Live Search SQL Query:"
          template={["SELECT * FROM products WHERE name LIKE '%", "%' OR description LIKE '%", "%' OR category LIKE '%", "%'"]}
          inputs={[searchQuery, searchQuery, searchQuery]}
        />

        {/* Product Grid or Error State */}
        {searchResults.error ? (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3 shadow-sm">
            <AlertCircle size={24} className="mt-0.5 flex-shrink-0 text-red-500" />
            <div>
              <h3 className="font-bold text-lg mb-1">SQL Execution Error</h3>
              <p className="font-mono text-sm break-all">{searchResults.error}</p>
              <p className="mt-2 text-sm text-red-600">
                <strong>Hint:</strong> Your payload caused a syntax error or a column mismatch (e.g., UNION with wrong column count). Check your query above and adjust!
              </p>
            </div>
          </div>
        ) : searchResults.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.data.map((product, idx) => (
              <div key={product.id || `inj-${idx}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  <span className="text-sm font-medium">{product.category || 'Injected'} Image</span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {product.category || 'N/A'}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                    {product.name || 'Unknown Item'}
                  </h3>
                  <p className="text-gray-500 text-sm flex-grow mb-4 line-clamp-2">
                    {product.description || 'No description available.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-extrabold text-gray-900">
                      ${Number(product.price || 0).toFixed(2)}
                    </span>
                    <button
                      onClick={addToCart}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              We couldn't find anything matching "{searchQuery}". Try adjusting your search.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-6 text-blue-600 font-medium hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Login Component ---
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      // VULNERABLE TO SQL INJECTION: Direct string concatenation evaluated by real SQL engine
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

      console.log(`Executing Login SQL:\nSELECT * FROM users WHERE username = '[ ${username} ]' AND password = '[ ${password} ]'`);

      const result = window.alasql(query);

      if (result && result.length > 0) {
        // Log in as the first returned user (demonstrates privilege escalation if they inject 'admin')
        onLogin(result[0].username);
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      // Displaying raw DB errors to the UI is a common vulnerability that aids attackers
      setError(`Database Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to access the store</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span className="break-all">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="text" // Changed to text so students can see their payload easily
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                placeholder="Enter password (or SQL payload)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-2 text-xs text-blue-700">
            <strong>Normal Login:</strong> User: <code className="bg-gray-200 px-1 rounded">shopper</code> Pass: <code className="bg-gray-200 px-1 rounded">password123</code>
          </div>
        </div>
      </div>

      {/* Educational Live Query Viewer - Detached for wider viewing */}
      <div className="max-w-4xl w-full rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <LiveQueryViewer
          title="Live Login SQL Query:"
          template={["SELECT * FROM users WHERE username = '", "' AND password = '", "'"]}
          inputs={[username, password]}
        />
      </div>
    </div>
  );
}
