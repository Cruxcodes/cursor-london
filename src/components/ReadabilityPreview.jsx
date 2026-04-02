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
    { id: "original", label: "ORIGINAL" },
    { id: "optimized", label: "DYSLEXIA-FRIENDLY" },
    { id: "compare", label: "SIDE BY SIDE" },
  ];

  const bgTints = {
    original: "#ffffff",
    optimized: "#fdf6e3",
  };

  return (
    <div className="border border-border-subtle" style={{ borderRadius: "1px" }}>
      <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-text-secondary">
            READABILITY PREVIEW
          </h3>
          <p className="text-[11px] text-text-tertiary font-mono mt-0.5">
            See your site's text through different eyes
          </p>
        </div>
        <div className="flex gap-1">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${
                mode === m.id
                  ? "bg-accent text-black font-bold"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {mode === "compare" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-text-tertiary font-mono uppercase tracking-[0.15em] mb-2">
                ORIGINAL
              </p>
              <div
                className="p-5 text-neutral-800"
                style={{ ...originalStyles, backgroundColor: bgTints.original, color: "#000", borderRadius: "1px" }}
              >
                {text}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary font-mono uppercase tracking-[0.15em] mb-2">
                DYSLEXIA-FRIENDLY
              </p>
              <div
                className="p-5"
                style={{ ...optimizedStyles, backgroundColor: bgTints.optimized, color: "#333", borderRadius: "1px" }}
              >
                {text}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="p-5 transition-all duration-300"
            style={{
              ...(mode === "optimized" ? optimizedStyles : originalStyles),
              backgroundColor: mode === "optimized" ? bgTints.optimized : bgTints.original,
              color: mode === "optimized" ? "#333" : "#000",
              borderRadius: "1px",
            }}
          >
            {text}
          </div>
        )}

        {dyslexiaReport?.top_recommendation && (
          <div className="mt-4 border-l-[3px] border-accent bg-accent-glow px-3 py-2">
            <p className="text-[12px] text-text-secondary font-mono">
              <span className="text-text-accent font-bold">TIP: </span>
              {dyslexiaReport.top_recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
