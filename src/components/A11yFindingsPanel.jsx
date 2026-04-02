import FindingCard from "./FindingCard";

function DyslexiaReport({ report }) {
  if (!report) return null;

  const scoreColor =
    report.overall_dyslexia_score <= 3
      ? "text-severity-critical"
      : report.overall_dyslexia_score <= 6
      ? "text-severity-warning"
      : "text-severity-safe";

  return (
    <div className="bg-bg-elevated p-4 space-y-3" style={{ borderRadius: "1px" }}>
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-text-secondary">
          DYSLEXIA READABILITY
        </h4>
        <span className={`font-mono font-bold text-lg ${scoreColor}`}>
          {report.overall_dyslexia_score}/10
        </span>
      </div>

      {report.top_recommendation && (
        <div className="border-l-[3px] border-accent bg-accent-glow px-3 py-2">
          <p className="text-[10px] font-mono font-bold text-text-accent uppercase tracking-[0.1em] mb-1">
            TOP RECOMMENDATION
          </p>
          <p className="text-[13px] text-text-secondary">{report.top_recommendation}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <StatusItem label="Font Choice" ok={report.font_analysis?.is_dyslexia_friendly} />
        <StatusItem label="Line Height" ok={report.spacing_analysis?.line_height_ok} />
        <StatusItem label="Letter Spacing" ok={report.spacing_analysis?.letter_spacing_ok} />
        <StatusItem label="Word Spacing" ok={report.spacing_analysis?.word_spacing_ok} />
        <StatusItem label="Paragraph Width" ok={report.spacing_analysis?.paragraph_width_ok} />
        <StatusItem label="No Justified Text" ok={!report.layout_analysis?.justified_text_found} />
        <StatusItem label="No Pure B/W" ok={!report.colour_analysis?.has_pure_black_on_white} />
      </div>

      {report.font_analysis?.current_fonts?.length > 0 && (
        <p className="text-[10px] text-text-tertiary font-mono">
          Fonts: {report.font_analysis.current_fonts.join(", ")}
        </p>
      )}
    </div>
  );
}

function StatusItem({ label, ok }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={ok ? "text-severity-safe" : "text-severity-critical"}>
        {ok ? "✓" : "✗"}
      </span>
      <span className="text-text-tertiary">{label}</span>
    </div>
  );
}

export default function A11yFindingsPanel({ results }) {
  if (!results) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-text-tertiary text-[13px] font-mono">
          {">"} Awaiting analysis...
        </p>
      </div>
    );
  }

  const scoreColor =
    results.a11y_score <= 3
      ? "text-severity-critical"
      : results.a11y_score <= 6
      ? "text-severity-warning"
      : results.a11y_score <= 8
      ? "text-severity-info"
      : "text-severity-safe";

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border-subtle">
        <div className="flex items-baseline gap-3">
          <span className={`font-mono font-bold text-2xl ${scoreColor}`}>
            {results.a11y_score}/10
          </span>
          <p className="text-[12px] text-text-secondary font-mono flex-1">{results.summary}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <DyslexiaReport report={results.dyslexia_report} />

        {results.findings?.map((finding, i) => (
          <FindingCard key={i} finding={finding} type="a11y" />
        ))}
      </div>
    </div>
  );
}
