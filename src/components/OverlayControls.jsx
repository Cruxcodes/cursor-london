const tintOptions = [
  { id: "off", label: "Off", color: "#666" },
  { id: "warm", label: "Peach", color: "#FFE4B5" },
  { id: "yellow", label: "Yellow", color: "#FFFF96" },
  { id: "blue", label: "Blue", color: "#ADD8E6" },
  { id: "green", label: "Green", color: "#B4EEB4" },
  { id: "rose", label: "Rose", color: "#FFB6C1" },
];

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={`w-8 h-4 rounded-full transition-colors relative ${
          checked ? "bg-flame" : "bg-neutral-700"
        }`}
        onClick={onChange}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </div>
      <span className="text-xs text-neutral-300 group-hover:text-neutral-100 transition-colors select-none">
        {label}
      </span>
    </label>
  );
}

export default function OverlayControls({
  tint,
  setTint,
  opacity,
  setOpacity,
  ruler,
  setRuler,
  focusStrip,
  setFocusStrip,
}) {
  return (
    <div className="absolute bottom-4 left-4 z-30 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 w-56 shadow-2xl">
      <p className="text-xs font-semibold text-neutral-300 mb-3 flex items-center gap-1.5">
        <span>🧠</span> Accessibility Overlays
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1.5">
            Colour Tint
          </p>
          <div className="flex gap-1.5">
            {tintOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => setTint(t.id)}
                title={t.label}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                  tint === t.id
                    ? "border-flame scale-110 shadow-lg"
                    : "border-neutral-600 hover:border-neutral-400"
                }`}
                style={{
                  backgroundColor: t.id === "off" ? "#333" : t.color,
                }}
              >
                {t.id === "off" && (
                  <span className="text-neutral-500 text-[10px] flex items-center justify-center">
                    ✕
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {tint !== "off" && (
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Opacity: {opacity}%
            </p>
            <input
              type="range"
              min="5"
              max="40"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-flame"
            />
          </div>
        )}

        <div className="space-y-2 pt-1 border-t border-neutral-800">
          <Toggle
            label="📏 Reading ruler"
            checked={ruler}
            onChange={() => setRuler(!ruler)}
          />
          <Toggle
            label="🔦 Focus strip"
            checked={focusStrip}
            onChange={() => setFocusStrip(!focusStrip)}
          />
        </div>
      </div>
    </div>
  );
}
