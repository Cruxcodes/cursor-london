import { useState } from "react";

const severityStyles = {
  critical: {
    border: "border-l-red-500",
    badge: "bg-red-500/20 text-red-400",
    label: "CRITICAL",
  },
  warning: {
    border: "border-l-amber-500",
    badge: "bg-amber-500/20 text-amber-400",
    label: "WARNING",
  },
  info: {
    border: "border-l-blue-500",
    badge: "bg-blue-500/20 text-blue-400",
    label: "INFO",
  },
};

export default function FindingCard({ finding, type }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityStyles[finding.severity] || severityStyles.info;

  return (
    <div
      className={`bg-surface-light rounded-lg border-l-4 ${sev.border} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 cursor-pointer hover:bg-surface-lighter transition-colors"
      >
        <div className="flex items-start gap-3">
          <span
            className={`px-2 py-0.5 text-xs font-bold rounded ${sev.badge} flex-shrink-0 mt-0.5`}
          >
            {sev.label}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {finding.file && (
                <span className="text-xs font-mono text-neutral-500">
                  {finding.file}
                  {finding.line && `:${finding.line}`}
                </span>
              )}
              {finding.wcag_criterion && (
                <span className="text-xs text-blue-400/60 font-mono">
                  {finding.wcag_criterion}
                </span>
              )}
              {finding.category && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                  {finding.category}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-200">{finding.issue}</p>
            {finding.roast && (
              <p className="text-xs text-neutral-500 italic mt-1">
                "{finding.roast}"
              </p>
            )}
          </div>
          <span className="text-neutral-600 text-sm flex-shrink-0">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-neutral-800 pt-3 space-y-3">
          {finding.impact && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                Impact
              </p>
              <p className="text-sm text-neutral-400">{finding.impact}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
              How to fix
            </p>
            <pre className="text-sm text-green-400/80 bg-bg rounded-lg p-3 overflow-x-auto font-mono whitespace-pre-wrap">
              {finding.fix}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
