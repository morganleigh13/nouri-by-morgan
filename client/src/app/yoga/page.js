const offerings = [
  "Flow-focused classes for balance, energy, and steady confidence.",
  "Restorative options that prioritize nervous-system support and recovery.",
  "Breath-led sequencing inspired by Nouri's theme of light and illumination.",
];

export default function YogaPage() {
  return (
    <section className="page-shell">
      <div className="glass-card grid gap-10 px-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="rounded-[2rem] bg-sky-100/80 p-8 text-slate-700 shadow-inner shadow-sky-200">
          <p className="section-kicker">Yoga</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Practice that brings more ease, light, and presence into everyday life.
          </h1>
        </div>
        <div className="space-y-5">
          <p className="text-lg leading-8 text-slate-600">
            Whether you want energizing morning flow, gentle evening reset, or private support, Nouri By Morgan
            offers classes that help you reconnect with your body and move with intention.
          </p>
          <ul className="space-y-4 text-slate-700">
            {offerings.map((item) => (
              <li key={item} className="rounded-3xl border border-slate-200 bg-white/70 px-5 py-4 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
