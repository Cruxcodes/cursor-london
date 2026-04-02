import { useState } from "react";
import { analyzeA11y, fetchPageSource } from "../api";
import LoadingState from "./LoadingState";
import PreviewPanel from "./PreviewPanel";
import A11yFindingsPanel from "./A11yFindingsPanel";
import ReadabilityPreview from "./ReadabilityPreview";
import SimulationBar from "./SimulationBar";

export default function A11yLiveMode() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [iframeError, setIframeError] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setError(null);
    setResults(null);
    setIframeError(false);
    setLoading(true);

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    setIframeUrl(normalizedUrl);

    try {
      const html = await fetchPageSource(normalizedUrl);
      const result = await analyzeA11y(html, normalizedUrl);
      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          placeholder="https://example.com"
          className="flex-1 bg-surface border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-flame/50 focus:ring-1 focus:ring-flame/20"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-flame hover:bg-flame-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
        >
          🔍 Analyze
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <LoadingState />}

      {(iframeUrl || results) && !loading && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ minHeight: "600px" }}>
            <PreviewPanel
              url={iframeUrl}
              onIframeError={() => setIframeError(true)}
              iframeError={iframeError}
            />
            <A11yFindingsPanel results={results} />
          </div>

          {results?.extracted_text && (
            <ReadabilityPreview
              text={results.extracted_text}
              dyslexiaReport={results.dyslexia_report}
            />
          )}

          <SimulationBar />
        </>
      )}
    </div>
  );
}
