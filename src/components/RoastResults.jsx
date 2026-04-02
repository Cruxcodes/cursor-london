import { useState } from "react";
import ScoreBanner from "./ScoreBanner";
import FindingCard from "./FindingCard";

export default function RoastResults({ results }) {
  const [tab, setTab] = useState("code");

  const findings =
    tab === "code" ? results.code_review : results.accessibility_audit;

  return (
    <div className="space-y-4 animate-in">
      <ScoreBanner
        score={results.overall_score}
        roast={results.summary_roast}
      />

      <div className="bg-surface rounded-xl border border-neutral-800 overflow-hidden">
        <div className="flex border-b border-neutral-800">
          <button
            onClick={() => setTab("code")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              tab === "code"
                ? "text-flame border-b-2 border-flame bg-surface-light"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Code Review
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-neutral-800">
              {results.code_review?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setTab("a11y")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              tab === "a11y"
                ? "text-flame border-b-2 border-flame bg-surface-light"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Accessibility
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-neutral-800">
              {results.accessibility_audit?.length || 0}
            </span>
          </button>
        </div>

        <div className="p-4 space-y-3">
          {findings && findings.length > 0 ? (
            findings.map((finding, i) => (
              <FindingCard key={i} finding={finding} type={tab} />
            ))
          ) : (
            <p className="text-neutral-500 text-sm py-8 text-center">
              No issues found. Suspicious.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
