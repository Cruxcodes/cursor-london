export default function Header() {
  return (
    <header className="pt-8 pb-2 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-flame to-amber-400 bg-clip-text text-transparent">
          Roast
        </span>
        <span className="text-neutral-100">My</span>
        <span className="bg-gradient-to-r from-flame to-red-500 bg-clip-text text-transparent">
          PR
        </span>
      </h1>
      <p className="mt-2 text-sm text-neutral-500 italic">
        The code reviewer that gives a damn about your users.
      </p>
    </header>
  );
}
