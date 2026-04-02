import { useState, useRef, useCallback } from "react";
import OverlayControls from "./OverlayControls";

const tints = {
  off: "transparent",
  warm: "rgba(255, 228, 181, 0.15)",
  yellow: "rgba(255, 255, 150, 0.12)",
  blue: "rgba(173, 216, 230, 0.12)",
  green: "rgba(180, 238, 180, 0.10)",
  rose: "rgba(255, 182, 193, 0.12)",
};

export default function PreviewPanel({ url, onIframeError, iframeError }) {
  const [tint, setTint] = useState("off");
  const [opacity, setOpacity] = useState(15);
  const [ruler, setRuler] = useState(false);
  const [focusStrip, setFocusStrip] = useState(false);
  const [mouseY, setMouseY] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ruler && !focusStrip) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setMouseY(e.clientY - rect.top);
    },
    [ruler, focusStrip]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseY(null);
  }, []);

  const tintColor =
    tint !== "off"
      ? tints[tint].replace(/[\d.]+\)$/, `${opacity / 100})`)
      : "transparent";

  const rulerHeight = 80;
  const stripHeight = 60;

  return (
    <div className="flex flex-col">
      <div className="px-3 py-2 border-b border-border-subtle flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-severity-safe" />
        <span className="text-[11px] text-text-tertiary font-mono truncate">
          {url}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 min-h-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {iframeError ? (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div className="font-mono">
              <p className="text-text-secondary text-[13px]">
                This site blocks iframe embedding.
              </p>
              <p className="text-text-tertiary text-[12px] mt-1">
                Try a different URL.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            title="Site preview"
            className="w-full h-full border-0"
            style={{ minHeight: "500px" }}
            sandbox="allow-scripts allow-same-origin"
            onError={onIframeError}
          />
        )}

        {tint !== "off" && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ backgroundColor: tintColor }}
          />
        )}

        {ruler && mouseY !== null && (
          <>
            <div
              className="absolute inset-x-0 top-0 bg-black/40 pointer-events-none z-20"
              style={{ height: Math.max(0, mouseY - rulerHeight / 2), transition: "height 75ms ease" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-black/40 pointer-events-none z-20"
              style={{ top: mouseY + rulerHeight / 2, transition: "top 75ms ease" }}
            />
            <div
              className="absolute inset-x-0 pointer-events-none z-20 border-y border-accent/30"
              style={{ top: mouseY - rulerHeight / 2, height: rulerHeight, transition: "top 75ms ease" }}
            />
          </>
        )}

        {focusStrip && mouseY !== null && (
          <>
            <div
              className="absolute inset-x-0 top-0 bg-black/70 pointer-events-none z-20"
              style={{ height: Math.max(0, mouseY - stripHeight / 2), transition: "height 75ms ease" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-black/70 pointer-events-none z-20"
              style={{ top: mouseY + stripHeight / 2, transition: "top 75ms ease" }}
            />
          </>
        )}

        <OverlayControls
          tint={tint}
          setTint={setTint}
          opacity={opacity}
          setOpacity={setOpacity}
          ruler={ruler}
          setRuler={setRuler}
          focusStrip={focusStrip}
          setFocusStrip={setFocusStrip}
        />
      </div>
    </div>
  );
}
