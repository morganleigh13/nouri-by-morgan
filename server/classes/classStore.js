import crypto from "node:crypto";
import ClassSession from "./classModel.js";
import { defaultClasses } from "../data/defaultContent.js";
import { isDatabaseReady } from "../db/connect.js";

let memoryClasses = defaultClasses.map((session) => ({
  ...session,
  id: crypto.randomUUID(),
}));

function normalizeClassSession(input) {
  return {
    title: input.title?.trim() || "",
    discipline: input.discipline?.trim() || "Yoga",
    schedule: input.schedule?.trim() || "",
    location: input.location?.trim() || "",
    description: input.description?.trim() || "",
    ctaLabel: input.ctaLabel?.trim() || "Reserve",
  };
}

function toClientShape(document) {
  return {
    id: document.id || document._id?.toString(),
    title: document.title,
    discipline: document.discipline,
    schedule: document.schedule,
    location: document.location,
    description: document.description,
    ctaLabel: document.ctaLabel,
  };
}

async function ensureSeedClasses() {
  const count = await ClassSession.countDocuments();

  if (count > 0) {
    return;
  }

  await ClassSession.insertMany(defaultClasses);
}

export async function listClasses() {
  if (!isDatabaseReady()) {
    return memoryClasses;
  }

  await ensureSeedClasses();
  const classes = await ClassSession.find().sort({ createdAt: -1 }).lean();
  return classes.map(toClientShape);
}

export async function createClass(payload) {
  const nextClass = normalizeClassSession(payload);

  if (!isDatabaseReady()) {
    const classSession = {
      ...nextClass,
      id: crypto.randomUUID(),
    };
    memoryClasses = [classSession, ...memoryClasses];
    return classSession;
  }

  const created = await ClassSession.create(nextClass);
  return toClientShape(created.toObject());
}

export async function updateClass(classId, payload) {
  const nextClass = normalizeClassSession(payload);

  if (!isDatabaseReady()) {
    memoryClasses = memoryClasses.map((session) =>
      session.id === classId
        ? {
            ...session,
            ...nextClass,
          }
        : session,
    );
    return memoryClasses.find((session) => session.id === classId) || null;
  }

  const updated = await ClassSession.findByIdAndUpdate(classId, nextClass, {
    new: true,
    runValidators: true,
  }).lean();

  return updated ? toClientShape(updated) : null;
}

export async function deleteClass(classId) {
  if (!isDatabaseReady()) {
    const existingLength = memoryClasses.length;
    memoryClasses = memoryClasses.filter((session) => session.id !== classId);
    return existingLength !== memoryClasses.length;
  }

  const deleted = await ClassSession.findByIdAndDelete(classId);
  return Boolean(deleted);
}
