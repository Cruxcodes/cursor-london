import { useState } from "react";

export default function ReadabilityPreview({ text, dyslexiaReport }) {
  const [mode, setMode] = useState("original");

  const optimizedStyles = {
    fontFamily: "'OpenDyslexic', sans-serif",
    lineHeight: "1.8",
    letterSpacing: "0.12em",
    wordSpacing: "0.2em",
    maxWidth: "65ch",
    textAlign: "left",
    fontSize: "18px",
  };

  const originalStyles = {
    fontFamily: "serif",
    lineHeight: "1.3",
    letterSpacing: "normal",
    wordSpacing: "normal",
    textAlign: "justify",
    fontSize: "14px",
  };

  const modes = [
    { id: "original", label: "Original", icon: "📄" },
    { id: "optimized", label: "Dyslexia-Friendly", icon: "🧠" },
    { id: "compare", label: "Side by Side", icon: "⚡" },
  ];

  const bgTints = {
    original: "#ffffff",
    optimized: "#fdf6e3",
  };

  return (
    <div className="bg-surface rounded-xl border border-neutral-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">
            Readability Preview
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            See your site's text through different eyes
          </p>
        </div>
        <div className="flex gap-1">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                mode === m.id
                  ? "bg-flame text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {mode === "compare" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-500 mb-2 text-center font-semibold">
                Original
              </p>
              <div
                className="rounded-lg p-6 text-neutral-800"
                style={{
                  ...originalStyles,
                  backgroundColor: bgTints.original,
                  color: "#000",
                }}
              >
                {text}
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-2 text-center font-semibold">
                Dyslexia-Friendly
              </p>
              <div
                className="rounded-lg p-6"
                style={{
                  ...optimizedStyles,
                  backgroundColor: bgTints.optimized,
                  color: "#333",
                }}
              >
                {text}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-lg p-6 transition-all duration-300"
            style={{
              ...(mode === "optimized" ? optimizedStyles : originalStyles),
              backgroundColor:
                mode === "optimized" ? bgTints.optimized : bgTints.original,
              color: mode === "optimized" ? "#333" : "#000",
            }}
          >
            {text}
          </div>
        )}

        {dyslexiaReport?.top_recommendation && (
          <div className="mt-4 bg-flame/5 border border-flame/20 rounded-lg p-3 flex items-start gap-2">
            <span className="text-flame text-sm">💡</span>
            <p className="text-xs text-neutral-400">
              <span className="text-flame font-semibold">Pro tip:</span>{" "}
              {dyslexiaReport.top_recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
