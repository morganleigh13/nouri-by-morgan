import { Router } from "express";
import { createClass, deleteClass, listClasses, updateClass } from "./classStore.js";
import { requireOwnerAuth } from "../auth/requireOwnerAuth.js";

const router = Router();

router.get("/", async (_request, response, next) => {
  try {
    response.json({ classes: await listClasses() });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireOwnerAuth, async (request, response, next) => {
  try {
    const classSession = await createClass(request.body);
    response.status(201).json({ classSession });
  } catch (error) {
    next(error);
  }
});

router.put("/:classId", requireOwnerAuth, async (request, response, next) => {
  try {
    const classSession = await updateClass(request.params.classId, request.body);

    if (!classSession) {
      response.status(404).json({ message: "Class not found." });
      return;
    }

    response.json({ classSession });
  } catch (error) {
    next(error);
  }
});

router.delete("/:classId", requireOwnerAuth, async (request, response, next) => {
  try {
    const deleted = await deleteClass(request.params.classId);

    if (!deleted) {
      response.status(404).json({ message: "Class not found." });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
