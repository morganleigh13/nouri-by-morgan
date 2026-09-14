export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Nouri By Morgan. Move with light and intention.</p>
        <p>Next.js · TailwindCSS · DaisyUI · Redux Toolkit · Node.js</p>
      </div>
    </footer>
  );
}
