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
    <div className="space-y-6">
      {/* URL input */}
      <div className="flex gap-3 items-center">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          placeholder="https://example.com"
          className="flex-1 bg-bg-surface border-0 border-b border-border-subtle font-mono text-[13px] text-text-primary placeholder-text-tertiary placeholder:italic px-4 py-3 focus:outline-none focus:border-accent transition-colors duration-150"
          onFocus={(e) => e.target.style.boxShadow = "0 2px 20px rgba(249,115,22,0.06)"}
          onBlur={(e) => e.target.style.boxShadow = "none"}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-5 py-2 bg-accent hover:bg-accent-hover text-black font-mono text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
          style={{ borderRadius: "2px" }}
        >
          ANALYZE
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="border-l-[3px] border-severity-critical bg-[rgba(239,68,68,0.06)] px-4 py-3 font-mono text-[13px]">
          <span className="text-severity-critical font-bold">ERROR: </span>
          <span className="text-text-secondary">{error}</span>
        </div>
      )}

      {loading && <LoadingState />}

      {(iframeUrl || results) && !loading && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border-subtle" style={{ minHeight: "550px", borderRadius: "1px" }}>
            <PreviewPanel
              url={iframeUrl}
              onIframeError={() => setIframeError(true)}
              iframeError={iframeError}
            />
            <div className="border-l border-border-subtle">
              <A11yFindingsPanel results={results} />
            </div>
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
