import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discipline: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLabel: {
      type: String,
      required: true,
      trim: true,
      default: "Reserve",
    },
  },
  {
    timestamps: true,
  },
);

const ClassSession = mongoose.models.ClassSession || mongoose.model("ClassSession", classSchema);

export default ClassSession;
