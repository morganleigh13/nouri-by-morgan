import { Router } from "express";
import { requireOwnerAuth } from "../auth/requireOwnerAuth.js";
import { getSiteContent, updateSiteContent } from "./siteContentStore.js";

const router = Router();

router.get("/", async (_request, response, next) => {
  try {
    response.json({ siteContent: await getSiteContent() });
  } catch (error) {
    next(error);
  }
});

router.put("/", requireOwnerAuth, async (request, response, next) => {
  try {
    response.json({ siteContent: await updateSiteContent(request.body) });
  } catch (error) {
    next(error);
  }
});

export default router;
