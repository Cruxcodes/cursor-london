import { useState } from "react";
import Header from "./components/Header";
import ModeTabBar from "./components/ModeTabBar";
import RoastPRMode from "./components/RoastPRMode";
import A11yLiveMode from "./components/A11yLiveMode";

export default function App() {
  const [mode, setMode] = useState("roast");

  return (
    <div className="min-h-screen bg-bg text-neutral-200">
      <Header />
      <ModeTabBar mode={mode} setMode={setMode} />
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {mode === "roast" ? <RoastPRMode /> : <A11yLiveMode />}
      </main>
    </div>
  );
}
