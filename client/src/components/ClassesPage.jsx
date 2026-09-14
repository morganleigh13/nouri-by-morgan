"use client";

import { useAppSelector } from "@/redux/hooks";

export default function ClassesPage() {
  const classes = useAppSelector((state) => state.studio.classes);

  return (
    <section className="page-shell">
      <div className="glass-card px-8 py-12 lg:px-12">
        <p className="section-kicker">Upcoming classes</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          A bright, easy-to-browse class schedule powered by the server database.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          The owner dashboard can add, edit, and remove these sessions so the classes page always stays current.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {classes.map((session) => (
            <article key={session.id} className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">{session.discipline}</p>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-950">
                  {session.ctaLabel}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">{session.title}</h2>
              <p className="mt-4 text-sm font-medium text-slate-500">{session.schedule}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{session.location}</p>
              <p className="mt-4 leading-7 text-slate-600">{session.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
