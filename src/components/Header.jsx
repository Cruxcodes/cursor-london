export default function Header() {
  return (
    <header className="pt-12 pb-4 text-center">
      <h1
        className="font-serif text-6xl font-normal tracking-tight not-italic"
        style={{ textShadow: "0 0 40px rgba(249,115,22,0.15)" }}
      >
        <span className="text-text-accent">Roast</span>
        <span className="text-text-primary">My</span>
        <span className="text-text-accent">PR</span>
      </h1>
      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] font-mono text-text-secondary font-light">
        The code reviewer that gives a damn about your users
      </p>
    </header>
  );
}
