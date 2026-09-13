"use client";

import Image from "next/image";
import Link from "next/link";
import { serviceHighlights } from "@/lib/siteData";
import { useAppSelector } from "@/redux/hooks";

const directImageLoader = ({ src }) => src;

export default function HomePage() {
  const { siteContent, classes } = useAppSelector((state) => state.studio);
  const featuredClasses = classes.slice(0, 3);

  return (
    <div className="page-shell space-y-10">
      <section className="glass-card grid gap-10 overflow-hidden px-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <div className="space-y-6">
          <p className="section-kicker">Illumination through movement</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            Nouri By Morgan helps every class feel like a return to strength, softness, and light.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">{siteContent.heroTagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/classes" className="btn btn-warning rounded-full px-6 text-base text-amber-950">
              View upcoming classes
            </Link>
            <Link href="/about" className="btn btn-ghost rounded-full border border-slate-200 px-6 text-base">
              Meet Morgan
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {siteContent.carouselImages.map((image) => (
            <figure
              key={image.src}
              className="relative min-h-56 overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-amber-100 via-white to-rose-100 shadow-inner"
            >
              <Image
                src={image.src}
                alt={image.alt}
                loader={directImageLoader}
                unoptimized
                width={720}
                height={480}
                className="h-full min-h-56 w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(15,23,42,0.68))]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">Gallery</p>
                <p className="mt-2 text-lg font-medium">{image.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {serviceHighlights.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass-card rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">{item.kicker}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="glass-card grid gap-10 px-8 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
        <div>
          <p className="section-kicker">About Morgan</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{siteContent.aboutMeTitle}</h2>
        </div>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">{siteContent.aboutMeBody}</p>
      </section>

      <section className="glass-card px-8 py-12 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Upcoming classes</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Reserve your next luminous session.</h2>
          </div>
          <Link href="/classes" className="btn btn-ghost rounded-full border border-slate-200 px-6 text-base">
            See full schedule
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredClasses.map((session) => (
            <article key={session.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">{session.discipline}</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">{session.title}</h3>
              <p className="mt-3 text-sm font-medium text-slate-500">{session.schedule}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{session.location}</p>
              <p className="mt-4 leading-7 text-slate-600">{session.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
