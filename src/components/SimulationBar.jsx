import { useState } from "react";

const simulations = [
  {
    id: "normal",
    label: "NORMAL",
    description: "Standard view",
    filter: "none",
  },
  {
    id: "dyslexia",
    label: "DYSLEXIA SIM",
    description: "Simulates visual stress and letter movement that many dyslexic readers experience",
    filter: "none",
  },
  {
    id: "low-vision",
    label: "LOW VISION",
    description: "Simulates reduced visual acuity — blurred vision common in low vision conditions",
    filter: "blur(1.5px) contrast(0.85)",
  },
  {
    id: "protanopia",
    label: "COLOR BLIND",
    description: "Simulates protanopia — difficulty distinguishing red and green colours",
    filter: "grayscale(30%) sepia(20%)",
  },
];

export default function SimulationBar() {
  const [active, setActive] = useState("normal");
  const [showInfo, setShowInfo] = useState(false);

  const activeSim = simulations.find((s) => s.id === active);

  return (
    <div className="border border-border-subtle" style={{ borderRadius: "1px" }}>
      <div className="px-4 py-3 border-b border-border-subtle">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-text-secondary">
          SEE YOUR SITE THROUGH DIFFERENT EYES
        </h3>
      </div>

      <div className="px-4 py-3">
        <div className="flex gap-2 flex-wrap">
          {simulations.map((sim) => (
            <button
              key={sim.id}
              onClick={() => {
                setActive(sim.id);
                setShowInfo(true);
              }}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${
                active === sim.id
                  ? "bg-accent text-black font-bold"
                  : "text-text-tertiary hover:text-text-secondary bg-bg-surface hover:bg-bg-surface-hover"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {sim.label}
            </button>
          ))}
        </div>

        {showInfo && active !== "normal" && (
          <div className="mt-3 bg-bg-surface p-4 animate-in" style={{ borderRadius: "1px" }}>
            <p className="text-[12px] text-text-primary font-mono font-medium mb-1">
              {activeSim.label}
            </p>
            <p className="text-[12px] text-text-tertiary font-mono">
              {activeSim.description}
            </p>
            {activeSim.filter !== "none" && (
              <div
                className="mt-3 p-4 bg-white text-neutral-800 text-[13px]"
                style={{ filter: activeSim.filter, borderRadius: "1px" }}
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
              <div className="mt-3 p-4 bg-white text-neutral-800 text-[13px] font-serif tracking-tight leading-tight" style={{ borderRadius: "1px" }}>
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
        )}
      </div>
    </div>
  );
}
