const tintOptions = [
  { id: "off", label: "Off", color: "#333" },
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
        className={`w-7 h-3.5 rounded-sm transition-colors duration-150 relative ${
          checked ? "bg-accent" : "bg-border-default"
        }`}
        onClick={onChange}
        style={{ borderRadius: "2px" }}
      >
        <div
          className={`absolute top-[2px] w-2.5 h-2.5 bg-text-primary transition-transform duration-150 ${
            checked ? "translate-x-[14px]" : "translate-x-[2px]"
          }`}
          style={{ borderRadius: "1px" }}
        />
      </div>
      <span className="text-[11px] font-mono text-text-secondary group-hover:text-text-primary transition-colors duration-150 select-none">
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
    <div
      className="absolute bottom-3 left-3 z-30 bg-bg-deep/95 backdrop-blur-sm border border-border-default p-3 w-52 shadow-2xl"
      style={{ borderRadius: "2px" }}
    >
      <p className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3">
        A11Y OVERLAYS
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] text-text-tertiary uppercase tracking-[0.15em] font-mono mb-1.5">
            COLOUR TINT
          </p>
          <div className="flex gap-1.5">
            {tintOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => setTint(t.id)}
                title={t.label}
                className={`w-5 h-5 border transition-all duration-150 cursor-pointer ${
                  tint === t.id
                    ? "border-accent scale-110"
                    : "border-border-subtle hover:border-border-default"
                }`}
                style={{
                  backgroundColor: t.color,
                  borderRadius: "1px",
                }}
              >
                {t.id === "off" && (
                  <span className="text-text-tertiary text-[8px] flex items-center justify-center">
                    ✕
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {tint !== "off" && (
          <div>
            <p className="text-[9px] text-text-tertiary uppercase tracking-[0.15em] font-mono mb-1">
              OPACITY {opacity}%
            </p>
            <input
              type="range"
              min="5"
              max="40"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-[2px] bg-border-subtle appearance-none cursor-pointer accent-accent"
            />
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-border-subtle">
          <Toggle label="Reading ruler" checked={ruler} onChange={() => setRuler(!ruler)} />
          <Toggle label="Focus strip" checked={focusStrip} onChange={() => setFocusStrip(!focusStrip)} />
        </div>
      </div>
    </div>
  );
}
