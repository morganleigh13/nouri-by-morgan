import SiteContent from "./siteContentModel.js";
import { defaultSiteContent } from "../data/defaultContent.js";
import { isDatabaseReady } from "../db/connect.js";

let memorySiteContent = structuredClone(defaultSiteContent);

function normalizeSiteContent(input) {
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
    memorySiteContent = { ...memorySiteContent, ...normalized };
    return memorySiteContent;
  }

  const existing = await ensureSeedContent();
  Object.assign(existing, normalized);
  await existing.save();
  return existing.toObject();
}
