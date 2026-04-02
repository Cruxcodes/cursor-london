import { useState } from "react";

const simulations = [
  {
    id: "normal",
    label: "Normal",
    icon: "👁️",
    description: "Standard view",
    filter: "none",
  },
  {
    id: "dyslexia",
    label: "Dyslexia Sim",
    icon: "🧠",
    description: "Simulates visual stress and letter movement that many dyslexic readers experience",
    filter: "none",
    className: "font-serif tracking-tight leading-tight",
  },
  {
    id: "low-vision",
    label: "Low Vision",
    icon: "🔍",
    description: "Simulates reduced visual acuity — blurred vision common in low vision conditions",
    filter: "blur(1.5px) contrast(0.85)",
  },
  {
    id: "protanopia",
    label: "Color Blind",
    icon: "🎨",
    description: "Simulates protanopia — difficulty distinguishing red and green colours",
    filter: "grayscale(30%) sepia(20%)",
  },
];

export default function SimulationBar() {
  const [active, setActive] = useState("normal");
  const [showInfo, setShowInfo] = useState(false);

  const activeSim = simulations.find((s) => s.id === active);

  return (
    <div className="bg-surface rounded-xl border border-neutral-800 overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
            <span>👁️</span> See your site through different eyes
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Experience how different users perceive your content
          </p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex gap-2 flex-wrap">
          {simulations.map((sim) => (
            <button
              key={sim.id}
              onClick={() => {
                setActive(sim.id);
                setShowInfo(true);
              }}
              className={`px-4 py-2 text-sm rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                active === sim.id
                  ? "bg-flame text-white shadow-lg shadow-flame/20"
                  : "bg-surface-light text-neutral-400 hover:text-neutral-200 hover:bg-surface-lighter"
              }`}
            >
              <span>{sim.icon}</span>
              {sim.label}
            </button>
          ))}
        </div>

        {showInfo && active !== "normal" && (
          <div className="mt-3 bg-surface-light rounded-lg p-4 animate-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{activeSim.icon}</span>
              <div>
                <p className="text-sm text-neutral-300 font-medium">
                  {activeSim.label}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {activeSim.description}
                </p>
                {activeSim.filter !== "none" && (
                  <div
                    className="mt-3 rounded-lg p-4 bg-white text-neutral-800 text-sm"
                    style={{ filter: activeSim.filter }}
                  >
                    <p className="font-semibold mb-1">Sample Preview</p>
                    <p>
                      This is how your content might appear to users with this
                      condition. Notice how colours, contrast, and clarity are
                      affected. Design with empathy.
                    </p>
                  </div>
                )}
                {active === "dyslexia" && (
                  <div className="mt-3 rounded-lg p-4 bg-white text-neutral-800 text-sm font-serif tracking-tight leading-tight">
                    <p className="font-semibold mb-1">Sample Preview</p>
                    <p style={{ wordSpacing: "-1px" }}>
                      Tihss is how yuor cnotnet migth appera to uesrs wtih
                      dyslexia. Letetrs can appaer to moev, swithc, or blru
                      toghteer. Porper fonnt chiose and spacnig maeks a huge
                      differenec.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
