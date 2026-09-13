"use client";

import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

const directImageLoader = ({ src }) => src;

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
            <figure key={image.src} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/80 shadow-sm">
              <Image
                src={image.src}
                alt={image.alt}
                loader={directImageLoader}
                unoptimized
                width={720}
                height={480}
                className="h-72 w-full object-cover"
              />
              <figcaption className="p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Studio moment</p>
                <p className="mt-4 text-lg font-medium text-slate-900">{image.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
