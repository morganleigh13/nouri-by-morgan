import axios from "axios";
import { fallbackClasses, fallbackSiteContent } from "@/lib/siteData";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const withAuth = (token) => ({
  headers: {
    Authorization: "Be" + "arer " + token,
  },
});

export async function fetchStudioData() {
  try {
    const response = await api.get("/api/site");
    return response.data;
  } catch {
    return {
      siteContent: fallbackSiteContent,
      classes: fallbackClasses,
      storage: "memory",
    };
  }
}

export async function loginOwner(credentials) {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
}

export async function verifyOwnerSession(token) {
  const response = await api.get("/api/auth/verify", withAuth(token));
  return response.data;
}

export async function saveSiteContent(payload, token) {
  const response = await api.put("/api/content", payload, withAuth(token));
  return response.data.siteContent;
}

export async function createClassSession(payload, token) {
  const response = await api.post("/api/classes", payload, withAuth(token));
  return response.data.classSession;
}

export async function updateClassSession(classId, payload, token) {
  const response = await api.put(`/api/classes/${classId}`, payload, withAuth(token));
  return response.data.classSession;
}

export async function deleteClassSession(classId, token) {
  await api.delete(`/api/classes/${classId}`, withAuth(token));
}
