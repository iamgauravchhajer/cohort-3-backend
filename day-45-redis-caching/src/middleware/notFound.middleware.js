import { AppError } from "../utils/AppError.js";

export const notFound = (_req, _res, _next) => {
  throw new AppError(404, "Route not found");
};
