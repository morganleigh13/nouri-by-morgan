import PortalLogin from "@/components/PortalLogin";
import { notFound } from "next/navigation";

export default async function OwnerLoginPage({ params }) {
  const { slug } = await params;
  const ownerSlug = process.env.NEXT_PUBLIC_OWNER_PORTAL_SLUG;

  if (!ownerSlug || slug !== ownerSlug) {
    notFound();
  }

  return <PortalLogin slug={slug} />;
}
