import { useState } from "react";

const severityStyles = {
  critical: {
    border: "border-l-severity-critical",
    text: "text-severity-critical",
    label: "CRITICAL",
  },
  warning: {
    border: "border-l-severity-warning",
    text: "text-severity-warning",
    label: "WARNING",
  },
  info: {
    border: "border-l-severity-info",
    text: "text-severity-info",
    label: "INFO",
  },
};

export default function FindingCard({ finding, type }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityStyles[finding.severity] || severityStyles.info;

  return (
    <div
      className={`bg-bg-surface border-l-[3px] ${sev.border} transition-colors duration-150`}
      style={{ borderRadius: "1px" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 cursor-pointer hover:bg-bg-surface-hover transition-colors duration-150"
      >
        <div className="flex items-start gap-3">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${sev.text} flex-shrink-0 mt-0.5`}>
            {sev.label}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {finding.file && (
                <span className="text-[12px] font-mono text-text-accent">
                  {finding.file}
                  {finding.line && `:${finding.line}`}
                </span>
              )}
              {finding.wcag_criterion && (
                <span className="text-[11px] text-text-tertiary font-mono">
                  {finding.wcag_criterion}
                </span>
              )}
              {finding.category && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary">
                  {finding.category}
                </span>
              )}
            </div>
            <p className="text-[13px] text-text-primary leading-relaxed">{finding.issue}</p>
            {finding.roast && (
              <p className="text-[12px] text-text-secondary italic mt-1.5 font-mono">
                <span className="text-text-tertiary">// </span>
                {finding.roast}
              </p>
            )}
          </div>
          <span className="text-text-tertiary text-[11px] font-mono flex-shrink-0">
            {expanded ? "− HIDE" : "+ SHOW FIX"}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-border-subtle pt-3 space-y-3 animate-in">
          {finding.impact && (
            <div>
              <p className="text-[10px] font-mono font-bold text-text-tertiary uppercase tracking-[0.1em] mb-1">
                IMPACT
              </p>
              <p className="text-[13px] text-text-secondary">{finding.impact}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-mono font-bold text-text-tertiary uppercase tracking-[0.1em] mb-1">
              FIX
            </p>
            <pre className="text-[13px] text-severity-safe bg-bg-deep p-3 font-mono whitespace-pre-wrap overflow-x-auto" style={{ borderRadius: "2px" }}>
              {finding.fix}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
