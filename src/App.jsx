import { useState } from "react";
import Header from "./components/Header";
import ModeTabBar from "./components/ModeTabBar";
import RoastPRMode from "./components/RoastPRMode";
import A11yLiveMode from "./components/A11yLiveMode";

export default function App() {
  const [mode, setMode] = useState("roast");

  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pb-16 animate-in-stagger">
        <Header />
        <ModeTabBar mode={mode} setMode={setMode} />
        <main className="pt-6">
          {mode === "roast" ? <RoastPRMode /> : <A11yLiveMode />}
        </main>
      </div>
    </div>
  );
}
