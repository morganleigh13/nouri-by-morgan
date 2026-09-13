import SiteContent from "./siteContentModel.js";
import { defaultSiteContent } from "../data/defaultContent.js";
import { isDatabaseReady } from "../db/connect.js";

let memorySiteContent = structuredClone(defaultSiteContent);

function normalizeSiteContent(input) {
  return {
    heroTagline: input.heroTagline?.trim() || defaultSiteContent.heroTagline,
    aboutMeTitle: input.aboutMeTitle?.trim() || defaultSiteContent.aboutMeTitle,
    aboutMeBody: input.aboutMeBody?.trim() || defaultSiteContent.aboutMeBody,
    carouselImages:
      input.carouselImages?.map((image, index) => ({
        src: image.src?.trim(),
        alt: image.alt?.trim() || `Nouri By Morgan gallery image ${index + 1}`,
      }))?.filter((image) => image.src) || defaultSiteContent.carouselImages,
    contactEmail: input.contactEmail?.trim() || defaultSiteContent.contactEmail,
    contactPhone: input.contactPhone?.trim() || defaultSiteContent.contactPhone,
    instagramUrl: input.instagramUrl?.trim() || defaultSiteContent.instagramUrl,
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
  const normalized = normalizeSiteContent(payload);

  if (!isDatabaseReady()) {
    memorySiteContent = {
      ...memorySiteContent,
      ...normalized,
    };
    return memorySiteContent;
  }

  const existing = await ensureSeedContent();
  Object.assign(existing, {
    ...normalized,
    contactEmail: existing.contactEmail,
    contactPhone: existing.contactPhone,
    instagramUrl: existing.instagramUrl,
  });
  await existing.save();
  return existing.toObject();
}
