import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreProvider from "@/components/StoreProvider";
import StudioBootstrap from "@/components/StudioBootstrap";
import "./globals.css";

export const metadata = {
  title: "Nouri By Morgan",
  description: "Illuminating yoga and body sculpting experiences with classes, coaching, and mindful movement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="h-full scroll-smooth">
      <body className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(254,240,138,0.25),_transparent_35%),linear-gradient(180deg,_#fffdf8,_#fff7ed_55%,_#ffffff)] text-slate-900">
        <StoreProvider>
          <StudioBootstrap />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
