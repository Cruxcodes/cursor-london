function getScoreColor(score) {
  if (score <= 3) return "text-severity-critical";
  if (score <= 6) return "text-severity-warning";
  if (score <= 8) return "text-severity-info";
  return "text-severity-safe";
}

function getEmoji(score) {
  if (score <= 3) return "🔥";
  if (score <= 6) return "😬";
  if (score <= 8) return "👍";
  return "🤌";
}

export default function ScoreBanner({ score, roast }) {
  return (
    <div className="border-t border-border-subtle pt-6 pb-2 flex items-baseline gap-6 animate-in">
      <div className="flex items-baseline gap-2 flex-shrink-0">
        <span className={`font-mono font-bold text-[52px] leading-none ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="font-mono text-text-tertiary text-lg">/10</span>
        <span className="text-2xl ml-1">{getEmoji(score)}</span>
      </div>
      <p className="font-serif text-xl text-text-secondary italic leading-snug">
        {roast}
      </p>
    </div>
  );
}
