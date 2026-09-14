import Link from "next/link";
import { navigationLinks } from "@/lib/siteData";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-lg font-semibold text-amber-950 shadow-sm">
            N
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">Nouri</p>
            <p className="text-lg font-semibold">By Morgan</p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-amber-100 hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
