"use client";

import { useAppSelector } from "@/redux/hooks";

export default function ContactPage() {
  const { contactEmail, instagramUrl } = useAppSelector((state) => state.studio.siteContent);
  const instagramHandle = instagramUrl.replace(/^https?:\/\/instagram\.com\//, "@");
  const contactCards = [
    {
      title: "Email",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      title: "Instagram",
      value: instagramHandle,
      href: instagramUrl,
    },
    {
      title: "Book a consult",
      value: "Reach out for private sessions and partnerships.",
      href: `mailto:${contactEmail}?subject=Nouri%20By%20Morgan%20Inquiry`,
    },
  ];

  return (
    <section className="page-shell">
      <div className="glass-card px-8 py-12 lg:px-12">
        <p className="section-kicker">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          Let&apos;s create a movement experience that feels personal, grounded, and bright.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Get in touch for private yoga, body sculpting sessions, workshop collaborations, or to ask about
          upcoming classes.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">{card.title}</p>
              <p className="mt-4 text-lg font-medium text-slate-900">{card.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
