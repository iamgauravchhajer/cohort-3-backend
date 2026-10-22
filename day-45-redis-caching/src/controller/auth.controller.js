import { env } from "../config/env.js";
import {
  clearRefreshToken,
  createUser,
  findUserByEmail,
  findUserByIdWithRefreshToken,
  updateRefreshToken,
} from "../DAO/user.dao.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  REFRESH_TOKEN_MAX_AGE_MS,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const REFRESH_COOKIE = "refreshToken";

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "strict",
  path: "/api/v1/auth",
};

const toPublicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const issueTokens = async (user) => {
  const payload = { id: user._id.toString(), email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const updated = await updateRefreshToken(payload.id, refreshToken);
  if (!updated) throw new AppError(401, "Invalid credentials");
  return { accessToken, refreshToken };
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie(REFRESH_COOKIE, refreshToken, { ...refreshCookieOptions, maxAge: REFRESH_TOKEN_MAX_AGE_MS });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError(409, "Email already registered", [
      { field: "email", message: "Email already registered" },
    ]);
  }

  const user = await createUser({ name, email, password });
  const { accessToken, refreshToken } = await issueTokens(user);
  setRefreshCookie(res, refreshToken);

  sendSuccess(res, 201, "Registration successful", { user: toPublicUser(user), accessToken });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  const valid = user ? await user.comparePassword(password) : false;
  if (!user || !valid) throw new AppError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await issueTokens(user);
  setRefreshCookie(res, refreshToken);

  sendSuccess(res, 200, "Login successful", { user: toPublicUser(user), accessToken });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (typeof token !== "string" || !token) throw new AppError(401, "Refresh token missing");

  const payload = verifyRefreshToken(token);
  const user = await findUserByIdWithRefreshToken(payload.id);

  if (!user || !user.refreshToken || user.refreshToken !== token) {
    if (user) await clearRefreshToken(user._id.toString());
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
    throw new AppError(401, "Invalid refresh token");
  }

  const { accessToken, refreshToken } = await issueTokens(user);
  setRefreshCookie(res, refreshToken);

  sendSuccess(res, 200, "Token refreshed", { accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE];

  if (typeof token === "string" && token) {
    try {
      const payload = verifyRefreshToken(token);
      const user = await findUserByIdWithRefreshToken(payload.id);
      if (user && user.refreshToken === token) await clearRefreshToken(payload.id);
    } catch {
    }
  }

  res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
  sendSuccess(res, 200, "Logout successful", null);
});

export const me = asyncHandler(async (req, res) => {
  if (!req.user) throw new AppError(401, "Authentication required");
  sendSuccess(res, 200, "Current user", { user: toPublicUser(req.user) });
});
