const tabs = [
  { id: "roast", label: "ROAST PR" },
  { id: "a11y", label: "TEST LIVE SITE" },
];

export default function ModeTabBar({ mode, setMode }) {
  return (
    <div className="border-b border-border-subtle">
      <div className="flex justify-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`pb-3 text-[12px] uppercase tracking-[0.15em] font-mono font-medium transition-colors duration-150 cursor-pointer relative ${
              mode === tab.id
                ? "text-text-accent"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {tab.label}
            {mode === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                style={{ boxShadow: "0 0 8px rgba(249,115,22,0.3)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
