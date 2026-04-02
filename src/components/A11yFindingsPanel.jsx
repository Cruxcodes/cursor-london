import FindingCard from "./FindingCard";

function DyslexiaReport({ report }) {
  if (!report) return null;

  const scoreStyle =
    report.overall_dyslexia_score <= 3
      ? "text-red-500"
      : report.overall_dyslexia_score <= 6
      ? "text-amber-500"
      : "text-green-500";

  return (
    <div className="bg-surface-lighter rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5">
          <span>🧠</span> Dyslexia Readability
        </h4>
        <span className={`text-lg font-bold font-mono ${scoreStyle}`}>
          {report.overall_dyslexia_score}/10
        </span>
      </div>

      {report.top_recommendation && (
        <div className="bg-flame/10 border border-flame/20 rounded-lg p-3">
          <p className="text-xs text-flame font-semibold mb-1">
            Top Recommendation
          </p>
          <p className="text-sm text-neutral-300">
            {report.top_recommendation}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <StatusItem
          label="Font Choice"
          ok={report.font_analysis?.is_dyslexia_friendly}
        />
        <StatusItem
          label="Line Height"
          ok={report.spacing_analysis?.line_height_ok}
        />
        <StatusItem
          label="Letter Spacing"
          ok={report.spacing_analysis?.letter_spacing_ok}
        />
        <StatusItem
          label="Word Spacing"
          ok={report.spacing_analysis?.word_spacing_ok}
        />
        <StatusItem
          label="Paragraph Width"
          ok={report.spacing_analysis?.paragraph_width_ok}
        />
        <StatusItem
          label="No Justified Text"
          ok={!report.layout_analysis?.justified_text_found}
        />
        <StatusItem
          label="No Pure B/W"
          ok={!report.colour_analysis?.has_pure_black_on_white}
        />
      </div>

      {report.font_analysis?.current_fonts?.length > 0 && (
        <p className="text-[10px] text-neutral-500">
          Fonts detected:{" "}
          {report.font_analysis.current_fonts.join(", ")}
        </p>
      )}
    </div>
  );
}

function StatusItem({ label, ok }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={ok ? "text-green-500" : "text-red-400"}>
        {ok ? "✓" : "✗"}
      </span>
      <span className="text-neutral-400">{label}</span>
    </div>
  );
}

export default function A11yFindingsPanel({ results }) {
  if (!results) {
    return (
      <div className="bg-surface rounded-xl border border-neutral-800 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">
          Results will appear here after analysis...
        </p>
      </div>
    );
  }

  const scoreStyle =
    results.a11y_score <= 3
      ? "text-red-500"
      : results.a11y_score <= 6
      ? "text-amber-500"
      : results.a11y_score <= 8
      ? "text-blue-500"
      : "text-green-500";

  return (
    <div className="bg-surface rounded-xl border border-neutral-800 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <span className={`text-3xl font-bold font-mono ${scoreStyle}`}>
            {results.a11y_score}/10
          </span>
          <p className="text-sm text-neutral-400 flex-1">{results.summary}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <DyslexiaReport report={results.dyslexia_report} />

        {results.findings?.map((finding, i) => (
          <FindingCard key={i} finding={finding} type="a11y" />
        ))}
      </div>
    </div>
  );
}
