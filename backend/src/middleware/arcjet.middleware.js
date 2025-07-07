import { aj } from "../config/arcjet.js";
//  Arcjet middleware for rate limiting, bot protection, and security

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests are not allowed",
        });
      } else {

        res.status(403).json({
          error: "Forbidden",
          message: "Access denied by security policy",
        });
      }
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    res.status(400).json("Arcjet error:", error);
    next();
  }
};
