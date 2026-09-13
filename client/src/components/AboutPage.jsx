"use client";

import { useAppSelector } from "@/redux/hooks";

export default function AboutPage() {
  const about = useAppSelector((state) => state.studio.siteContent);

  return (
    <section className="page-shell">
      <div className="glass-card space-y-8 px-8 py-12 lg:px-12">
        <div>
          <p className="section-kicker">About me</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            {about.aboutMeTitle}
          </h1>
        </div>
        <p className="max-w-4xl text-lg leading-8 text-slate-600">{about.aboutMeBody}</p>
        <div className="grid gap-5 md:grid-cols-3">
          {about.carouselImages.map((image) => (
            <div key={image.src} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Studio moment</p>
              <p className="mt-4 text-lg font-medium text-slate-900">{image.alt}</p>
              <p className="mt-2 break-all text-sm text-slate-500">{image.src}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
