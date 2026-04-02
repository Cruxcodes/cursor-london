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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-neutral-800 border-t-flame rounded-full animate-spin" />
      </div>
      <p
        className="text-neutral-400 text-sm italic animate-pulse transition-all duration-500"
        key={index}
      >
        {messages[index]}
      </p>
    </div>
  );
}
