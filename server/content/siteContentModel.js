import mongoose from "mongoose";

const carouselImageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const siteContentSchema = new mongoose.Schema(
  {
    heroTagline: {
      type: String,
      required: true,
      trim: true,
    },
    aboutMeTitle: {
      type: String,
      required: true,
      trim: true,
    },
    aboutMeBody: {
      type: String,
      required: true,
      trim: true,
    },
    carouselImages: {
      type: [carouselImageSchema],
      default: [],
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    instagramUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const SiteContent = mongoose.models.SiteContent || mongoose.model("SiteContent", siteContentSchema);

export default SiteContent;
