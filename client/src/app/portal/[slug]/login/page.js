import PortalLogin from "@/components/PortalLogin";
import { notFound } from "next/navigation";

const fallbackSlug = "owner-light-studio";

export default async function OwnerLoginPage({ params }) {
  const { slug } = await params;
  const ownerSlug = process.env.OWNER_PORTAL_SLUG || fallbackSlug;

  if (slug !== ownerSlug) {
    notFound();
  }

  return <PortalLogin slug={slug} />;
}
