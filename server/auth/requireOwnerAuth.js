import { verifyOwnerToken } from "./ownerAuth.js";

export function requireOwnerAuth(request, response, next) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Missing owner access token." });
    return;
  }

  try {
    const token = authorizationHeader.replace("Bearer ", "");
    request.owner = verifyOwnerToken(token);
    next();
  } catch {
    response.status(401).json({ message: "Owner session is invalid or has expired." });
  }
}
