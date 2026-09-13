import SiteContent from "./siteContentModel.js";
import { defaultSiteContent } from "../data/defaultContent.js";
import { isDatabaseReady } from "../db/connect.js";

let memorySiteContent = structuredClone(defaultSiteContent);

function normalizeSiteContent(input, currentContent = defaultSiteContent) {
  const normalizedCarouselImages =
    input.carouselImages
      ?.map((image, index) => ({
        src: image.src?.trim(),
        alt: image.alt?.trim() || `Nouri By Morgan gallery image ${index + 1}`,
      }))
      ?.filter((image) => image.src) || [];

  return {
    heroTagline: input.heroTagline?.trim() || defaultSiteContent.heroTagline,
    aboutMeTitle: input.aboutMeTitle?.trim() || defaultSiteContent.aboutMeTitle,
    aboutMeBody: input.aboutMeBody?.trim() || defaultSiteContent.aboutMeBody,
    carouselImages: normalizedCarouselImages.length ? normalizedCarouselImages : defaultSiteContent.carouselImages,
    contactEmail: input.contactEmail?.trim() || currentContent.contactEmail || defaultSiteContent.contactEmail,
    contactPhone: input.contactPhone?.trim() || currentContent.contactPhone || defaultSiteContent.contactPhone,
    instagramUrl: input.instagramUrl?.trim() || currentContent.instagramUrl || defaultSiteContent.instagramUrl,
  };
}

async function ensureSeedContent() {
  const existing = await SiteContent.findOne();

  if (existing) {
    return existing;
  }

  return SiteContent.create(defaultSiteContent);
}

export async function getSiteContent() {
  if (!isDatabaseReady()) {
    return memorySiteContent;
  }

  const siteContent = await ensureSeedContent();
  return siteContent.toObject();
}

export async function updateSiteContent(payload) {
  if (!isDatabaseReady()) {
    const normalized = normalizeSiteContent(payload, memorySiteContent);
    memorySiteContent = { ...memorySiteContent, ...normalized };
    return memorySiteContent;
  }

  const existing = await ensureSeedContent();
  const normalized = normalizeSiteContent(payload, existing.toObject());
  Object.assign(existing, normalized);
  await existing.save();
  return existing.toObject();
}
