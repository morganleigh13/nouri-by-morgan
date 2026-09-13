import { Router } from "express";
import { authenticateOwner, signOwnerToken } from "./ownerAuth.js";
import { requireOwnerAuth } from "./requireOwnerAuth.js";

const router = Router();

router.post("/login", async (request, response, next) => {
  try {
    const owner = await authenticateOwner(request.body);

    if (!owner) {
      response.status(401).json({ message: "Incorrect email or password." });
      return;
    }

    response.json({
      token: signOwnerToken(owner),
      owner,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", requireOwnerAuth, (request, response) => {
  response.json({ owner: request.owner });
});

export default router;
