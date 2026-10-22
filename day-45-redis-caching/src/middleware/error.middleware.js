import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err?.code === 11000) {
    const field = Object.keys(err.keyValue ?? err.keyPattern ?? {})[0] ?? "unknown";
    statusCode = 409;
    message = "Duplicate value";
    errors = [{ field, message: `${field} already exists` }];
  } else if (err?.name === "CastError") {
    statusCode = 400;
    message = "Invalid value";
    errors = [{ field: String(err.path), message: `Invalid ${err.path}` }];
  } else if (err?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err?.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err?.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Malformed JSON body";
  } else {
    console.error(err);
  }

  const body = { success: false, message, errors };
  if (!env.isProduction && err?.stack) body.stack = err.stack;

  return res.status(statusCode).json(body);
};
