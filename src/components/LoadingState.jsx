import { useState, useEffect } from "react";

const messages = [
  "Reading your code... already regretting it",
  "Counting accessibility violations like sheep",
  "Looking for alt text... still looking...",
  "Checking if you've heard of semantic HTML",
  "Your PR is loading. Unlike your error handling.",
  "Preparing your feedback sandwich (it's all bread)",
  "Analyzing... this might take a while, like your code reviews",
  "Searching for tests... found none. Shocking.",
  "Checking if screen readers can survive this",
  "Almost done. Unlike this PR, apparently.",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msg = messages[index];
    let charIndex = 0;
    setDisplayedText("");
    const typeInterval = setInterval(() => {
      if (charIndex <= msg.length) {
        setDisplayedText(msg.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 25);
    return () => clearInterval(typeInterval);
  }, [index]);

  return (
    <div className="py-12 font-mono text-sm">
      <div className="flex items-center gap-2">
        <span className="text-text-tertiary">{">"}</span>
        <span className="text-text-secondary">{displayedText}</span>
        <span className="text-text-accent cursor-blink">▊</span>
      </div>
    </div>
  );
}
