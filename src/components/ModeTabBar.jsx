const tabs = [
  { id: "roast", label: "Roast PR", icon: "🔥" },
  { id: "a11y", label: "Test Live Site", icon: "♿" },
];

export default function ModeTabBar({ mode, setMode }) {
  return (
    <div className="flex justify-center gap-2 py-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setMode(tab.id)}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            mode === tab.id
              ? "bg-flame text-white shadow-lg shadow-flame/20"
              : "bg-surface text-neutral-400 hover:bg-surface-light hover:text-neutral-200"
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
