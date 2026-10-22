import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

export const validate = (req, _res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const fieldErrors = [];
  const seen = new Set();
  for (const err of result.array()) {
    const field = err.type === "field" ? err.path : err.type;
    if (seen.has(field)) continue;
    seen.add(field);
    fieldErrors.push({ field, message: String(err.msg) });
  }
  throw new AppError(422, "Validation failed", fieldErrors);
};
