import OwnerDashboard from "@/components/OwnerDashboard";
import { notFound } from "next/navigation";

export default async function OwnerDashboardPage({ params }) {
  const { slug } = await params;
  const ownerSlug = process.env.NEXT_PUBLIC_OWNER_PORTAL_SLUG;

  if (!ownerSlug || slug !== ownerSlug) {
    notFound();
  }

  return <OwnerDashboard slug={slug} />;
}
