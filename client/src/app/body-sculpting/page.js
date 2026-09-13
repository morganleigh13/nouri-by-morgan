const benefits = [
  "Certified 9-in-1 ultrasound body sculpting in a calm, supportive setting.",
  "Non-invasive sessions designed to support contouring and body-confidence goals.",
  "Personalized guidance before, during, and after every appointment.",
];

const beforeCare = [
  "Complete your health history and disclose medications, implants, recent procedures, and any medical conditions.",
  "Follow your consultation guidance about whether this service is appropriate for you; do not book if you have not been cleared when clearance is required.",
  "Drink water consistently during the 24 hours before your appointment.",
  "Arrive with clean skin in the treatment area and avoid lotions, oils, or products that could interfere with the treatment.",
  "Wear comfortable clothing and plan enough time to review the treatment area and aftercare instructions.",
];

const afterCare = [
  "Continue drinking water over the next 24 to 72 hours and follow the personalized hydration guidance provided at your appointment.",
  "Take a gentle walk or maintain light movement if you feel comfortable, unless your provider gives you different instructions.",
  "Avoid alcohol and follow any treatment-specific guidance about strenuous exercise, heat, or other activities during your advised recovery window.",
  "Keep the treated area clean and follow any skin-care instructions provided after your session.",
  "Contact Nouri or your healthcare provider if you have unexpected, severe, or persistent pain, swelling, skin changes, or other concerning symptoms.",
];

export default function BodySculptingPage() {
  return (
    <section className="page-shell">
      <div className="glass-card grid gap-10 px-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <div className="space-y-6">
          <p className="section-kicker">Body sculpting</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Non-invasive 9-in-1 ultrasound body sculpting with thoughtful, certified care.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Morgan is certified in 9-in-1 ultrasound body sculpting and yoga, bringing a calm, informed approach to
            sessions designed around your goals, comfort, and confidence.
          </p>
          <a href="#care-guide" className="btn btn-warning rounded-full px-6 text-base text-amber-950">
            Read before and after care
          </a>
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

      <section id="care-guide" className="glass-card scroll-mt-28 px-8 py-12 lg:px-12">
        <div className="max-w-3xl">
          <p className="section-kicker">Appointment care guide</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            What to do 24–72 hours before and after your session.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            These are general preparation and aftercare reminders for this non-invasive service. Your consultation and
            appointment-specific instructions always take priority.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50/80 p-6">
            <h3 className="text-2xl font-semibold text-slate-950">Before your appointment</h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-amber-600">24–72 hours before</p>
            <ul className="mt-6 space-y-4">
              {beforeCare.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-sky-200 bg-sky-50/80 p-6">
            <h3 className="text-2xl font-semibold text-slate-950">After your appointment</h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-sky-600">For the next 24–72 hours</p>
            <ul className="mt-6 space-y-4">
              {afterCare.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-5 text-sm leading-6 text-slate-600">
          Body sculpting is not medical diagnosis or treatment. A consultation is required to review suitability,
          contraindications, and the specific protocol for your session.
        </p>
      </section>
    </section>
  );
}
