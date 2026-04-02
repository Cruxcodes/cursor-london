import { useState } from "react";
import { roastPR, fetchGitHubDiff } from "../api";
import LoadingState from "./LoadingState";
import RoastResults from "./RoastResults";

const DEMO_DIFF = `diff --git a/src/ProductCard.jsx b/src/ProductCard.jsx
new file mode 100644
--- /dev/null
+++ b/src/ProductCard.jsx
@@ -0,0 +1,18 @@
+import React from 'react';
+
+const ProductCard = ({ product, onBuy }) => {
+  return (
+    <div className="card" onClick={() => onBuy(product.id)}>
+      <img src={product.image} />
+      <div className="title" style={{color: '#999', fontSize: '12px'}}>
+        {product.name}
+      </div>
+      <div className="price">\${product.price}</div>
+      <div className="buy-btn" onClick={() => onBuy(product.id)}>
+        Buy Now
+      </div>
+    </div>
+  );
+};
+
+export default ProductCard;`;

const DEMO_DIFF_2 = `diff --git a/src/routes/login.js b/src/routes/login.js
new file mode 100644
--- /dev/null
+++ b/src/routes/login.js
@@ -0,0 +1,13 @@
+app.post('/api/login', (req, res) => {
+  const { username, password } = req.body;
+  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
+  db.query(query, (err, results) => {
+    if (results.length > 0) {
+      const token = jwt.sign({ id: results[0].id }, 'mysecretkey123');
+      res.json({ token, user: results[0] });
+    } else {
+      res.status(401).json({ error: 'Invalid credentials' });
+    }
+  });
+});`;

const DEMOS = [
  { label: "Bad React Component (a11y)", diff: DEMO_DIFF },
  { label: "API Route (security)", diff: DEMO_DIFF_2 },
];

export default function RoastPRMode() {
  const [inputTab, setInputTab] = useState("paste");
  const [diff, setDiff] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      let diffText = diff;

      if (inputTab === "url") {
        diffText = await fetchGitHubDiff(githubUrl);
      }

      if (!diffText.trim()) {
        throw new Error("Please provide a diff to review.");
      }

      const result = await roastPR(diffText);
      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = (demoIdx = 0) => {
    setInputTab("paste");
    setDiff(DEMOS[demoIdx].diff);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-neutral-800 overflow-hidden">
        <div className="flex border-b border-neutral-800">
          <button
            onClick={() => setInputTab("paste")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              inputTab === "paste"
                ? "text-flame border-b-2 border-flame bg-surface-light"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Paste Diff
          </button>
          <button
            onClick={() => setInputTab("url")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              inputTab === "url"
                ? "text-flame border-b-2 border-flame bg-surface-light"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            GitHub URL
          </button>
        </div>

        <div className="p-4">
          {inputTab === "paste" ? (
            <textarea
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
              placeholder="Paste your PR diff here..."
              className="w-full h-48 bg-bg border border-neutral-800 rounded-lg p-4 font-mono text-sm text-neutral-300 placeholder-neutral-600 resize-y focus:outline-none focus:border-flame/50 focus:ring-1 focus:ring-flame/20"
            />
          ) : (
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/owner/repo/pull/123"
              className="w-full bg-bg border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-flame/50 focus:ring-1 focus:ring-flame/20"
            />
          )}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-flame hover:bg-flame-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              🔥 Roast This PR
            </button>
            {DEMOS.map((demo, i) => (
              <button
                key={i}
                onClick={() => loadDemo(i)}
                className="px-4 py-2.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Demo: {demo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <LoadingState />}
      {results && <RoastResults results={results} />}
    </div>
  );
}
