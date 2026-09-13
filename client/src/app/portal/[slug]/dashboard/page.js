import OwnerDashboard from "@/components/OwnerDashboard";
import { notFound } from "next/navigation";

const fallbackSlug = "owner-light-studio";

export default async function OwnerDashboardPage({ params }) {
  const { slug } = await params;
  const ownerSlug = process.env.NEXT_PUBLIC_OWNER_PORTAL_SLUG || fallbackSlug;

  if (slug !== ownerSlug) {
    notFound();
  }

  return <OwnerDashboard slug={slug} />;
}
