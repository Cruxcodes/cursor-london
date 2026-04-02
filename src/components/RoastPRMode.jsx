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
      {/* Input sub-tabs */}
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-mono">
        <button
          onClick={() => setInputTab("paste")}
          className={`transition-colors duration-150 cursor-pointer ${
            inputTab === "paste" ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          PASTE DIFF
        </button>
        <span className="text-text-tertiary">/</span>
        <button
          onClick={() => setInputTab("url")}
          className={`transition-colors duration-150 cursor-pointer ${
            inputTab === "url" ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          GITHUB URL
        </button>
      </div>

      {/* Input area */}
      {inputTab === "paste" ? (
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          placeholder="Paste your PR diff here..."
          className="w-full h-48 bg-bg-surface border-0 border-b border-border-subtle font-mono text-[13px] text-text-primary placeholder-text-tertiary placeholder:italic resize-y p-4 focus:outline-none focus:border-accent transition-colors duration-150"
          style={{ boxShadow: diff ? "none" : undefined }}
          onFocus={(e) => e.target.style.boxShadow = "0 2px 20px rgba(249,115,22,0.06)"}
          onBlur={(e) => e.target.style.boxShadow = "none"}
        />
      ) : (
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://github.com/owner/repo/pull/123"
          className="w-full bg-bg-surface border-0 border-b border-border-subtle font-mono text-[13px] text-text-primary placeholder-text-tertiary placeholder:italic px-4 py-3 focus:outline-none focus:border-accent transition-colors duration-150"
          onFocus={(e) => e.target.style.boxShadow = "0 2px 20px rgba(249,115,22,0.06)"}
          onBlur={(e) => e.target.style.boxShadow = "none"}
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-accent hover:bg-accent-hover text-black font-mono text-[12px] font-bold uppercase tracking-[0.1em] rounded-none transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          style={{ borderRadius: "2px" }}
        >
          ROAST THIS PR
        </button>
        {DEMOS.map((demo, i) => (
          <button
            key={i}
            onClick={() => loadDemo(i)}
            className="font-mono text-[12px] text-text-tertiary hover:text-text-secondary transition-colors duration-150 cursor-pointer"
          >
            → {demo.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="border-l-[3px] border-severity-critical bg-[rgba(239,68,68,0.06)] px-4 py-3 font-mono text-[13px]">
          <span className="text-severity-critical font-bold">ERROR: </span>
          <span className="text-text-secondary">{error}</span>
        </div>
      )}

      {loading && <LoadingState />}
      {results && <RoastResults results={results} />}
    </div>
  );
}
