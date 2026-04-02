function getScoreStyle(score) {
  if (score <= 3) return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", emoji: "🔥" };
  if (score <= 6) return { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", emoji: "😬" };
  if (score <= 8) return { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", emoji: "👍" };
  return { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", emoji: "🤌" };
}

export default function ScoreBanner({ score, roast }) {
  const style = getScoreStyle(score);

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-xl p-6 flex items-center gap-6`}
    >
      <div className="flex-shrink-0 text-center">
        <div className={`text-5xl font-bold ${style.color} font-mono`}>
          {score}/10
        </div>
        <div className="text-2xl mt-1">{style.emoji}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg text-neutral-200 font-medium">{roast}</p>
      </div>
    </div>
  );
}
