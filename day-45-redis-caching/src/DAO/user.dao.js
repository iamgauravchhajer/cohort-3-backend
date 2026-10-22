import { UserModel } from "../models/user.model.js";

export const createUser = async (input) => {
  const user = await UserModel.create(input);
  return user;
};

export const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password");
  return user;
};

export const findUserById = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

export const findUserByIdWithRefreshToken = async (id) => {
  const user = await UserModel.findById(id).select("+refreshToken");
  return user;
};

export const updateRefreshToken = async (id, refreshToken) => {
  const user = await UserModel.findByIdAndUpdate(id, { refreshToken }, { new: true });
  return user;
};

export const clearRefreshToken = async (id) => {
  const user = await UserModel.findByIdAndUpdate(id, { refreshToken: null }, { new: true });
  return user;
};
