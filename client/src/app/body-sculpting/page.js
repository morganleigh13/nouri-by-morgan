const benefits = [
  "Strength-forward sessions designed to sculpt, tone, and improve posture.",
  "Supportive coaching for breath, alignment, and sustainable progress.",
  "A welcoming environment that balances challenge with restoration.",
];

export default function BodySculptingPage() {
  return (
    <section className="page-shell">
      <div className="glass-card grid gap-10 px-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <div className="space-y-6">
          <p className="section-kicker">Body sculpting</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Low-impact strength sessions that help your body feel powerful and supported.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Morgan blends mindful movement with targeted sculpting circuits so every class builds endurance,
            mobility, and confidence. Sessions are approachable for beginners while still offering plenty of burn.
          </p>
        </div>
        <div className="rounded-[2rem] bg-amber-100/80 p-8 text-slate-700 shadow-inner shadow-amber-200">
          <h2 className="text-xl font-semibold text-slate-900">What to expect</h2>
          <ul className="mt-5 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 leading-7">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
