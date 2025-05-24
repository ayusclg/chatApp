import { User } from "../models/user.models.js";

export const AccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.log("error in generating accessToken", error);
  }
};

export const RefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    user.refresh_token = refreshToken;
    user.save({ validateBeforeSave: false });
    return refreshToken;
  } catch (error) {
    console.log("error in generating RefreshToken", error);
  }
};
