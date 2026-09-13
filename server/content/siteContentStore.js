import SiteContent from "./siteContentModel.js";
import { defaultSiteContent } from "../data/defaultContent.js";
import { isDatabaseReady } from "../db/connect.js";

let memorySiteContent = structuredClone(defaultSiteContent);

function normalizeTextField(input, fieldName, currentValue, defaultValue) {
  if (Object.hasOwn(input, fieldName)) {
    return input[fieldName]?.trim() ?? "";
  }

  return currentValue ?? defaultValue;
}

function normalizeSiteContent(input, currentContent = defaultSiteContent) {
  const currentCarouselImages = currentContent.carouselImages || defaultSiteContent.carouselImages;
  const normalizedCarouselImages = input.carouselImages?.reduce((images, image, index) => {
    const src = image.src?.trim();

    if (!src) {
      return images;
    }

    const existingImage = currentCarouselImages.find((entry) => entry.src === src);

    images.push({
      src,
      alt: image.alt?.trim() || existingImage?.alt || `Nouri By Morgan gallery image ${index + 1}`,
    });

    return images;
  }, []);

  return {
    heroTagline: normalizeTextField(input, "heroTagline", currentContent.heroTagline, defaultSiteContent.heroTagline),
    aboutMeTitle: normalizeTextField(input, "aboutMeTitle", currentContent.aboutMeTitle, defaultSiteContent.aboutMeTitle),
    aboutMeBody: normalizeTextField(input, "aboutMeBody", currentContent.aboutMeBody, defaultSiteContent.aboutMeBody),
    carouselImages: input.carouselImages
      ? normalizedCarouselImages?.length
        ? normalizedCarouselImages
        : currentCarouselImages
      : currentCarouselImages,
    contactEmail: normalizeTextField(input, "contactEmail", currentContent.contactEmail, defaultSiteContent.contactEmail),
    contactPhone: normalizeTextField(input, "contactPhone", currentContent.contactPhone, defaultSiteContent.contactPhone),
    instagramUrl: normalizeTextField(input, "instagramUrl", currentContent.instagramUrl, defaultSiteContent.instagramUrl),
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
