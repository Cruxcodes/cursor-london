import { useState } from "react";
import ScoreBanner from "./ScoreBanner";
import FindingCard from "./FindingCard";

export default function RoastResults({ results }) {
  const [tab, setTab] = useState("code");

  const findings =
    tab === "code" ? results.code_review : results.accessibility_audit;

  return (
    <div className="space-y-6 animate-in">
      <ScoreBanner
        score={results.overall_score}
        roast={results.summary_roast}
      />

      {/* Result tabs */}
      <div className="border-b border-border-subtle flex gap-6">
        <button
          onClick={() => setTab("code")}
          className={`pb-2 text-[11px] uppercase tracking-[0.15em] font-mono font-medium transition-colors duration-150 cursor-pointer relative ${
            tab === "code" ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          CODE REVIEW
          <span className="ml-2 text-text-tertiary">{results.code_review?.length || 0}</span>
          {tab === "code" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
          )}
        </button>
        <button
          onClick={() => setTab("a11y")}
          className={`pb-2 text-[11px] uppercase tracking-[0.15em] font-mono font-medium transition-colors duration-150 cursor-pointer relative ${
            tab === "a11y" ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          ACCESSIBILITY
          <span className="ml-2 text-text-tertiary">{results.accessibility_audit?.length || 0}</span>
          {tab === "a11y" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
          )}
        </button>
      </div>

      {/* Findings */}
      <div className="space-y-2">
        {findings && findings.length > 0 ? (
          findings.map((finding, i) => (
            <FindingCard key={i} finding={finding} type={tab} />
          ))
        ) : (
          <p className="text-text-tertiary text-[13px] font-mono py-8">
            {">"} No issues found. Suspicious.
          </p>
        )}
      </div>
    </div>
  );
}
