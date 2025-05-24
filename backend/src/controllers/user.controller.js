import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import uploadImage from "../utils/multer.js";
import { AccessToken, RefreshToken } from "../utils/tokens.js";

const userRegister = async (req, res) => {
  try {
    const { email, username, fullname, password, address, gender } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "You are registered ,Please Login",
      });
    }
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.status(403).json({
        message: "Username Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = req.file;

    const photoUrl = await uploadImage(photo);
    const UserCreate = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
      address,
      fullname,
      profilePicture: photoUrl || " ",
    });

    if (!UserCreate) {
      return res.status(404).json({
        message: "Error in creating user",
      });
    }
    const createdUser = await User.findById(UserCreate._id).select(
      "-password -refresh_token"
    );
    res.status(200).json({
      mesage: "User Created",
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in User Register",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(403).json({
        message: "User Doesnt Exist",
      });
    }
    const passwordCheck = await bcrypt.compare(password, exist.password);
    if (!passwordCheck) {
      return res.status(404).json({
        message: "Password Invalid",
      });
    }
    const accessToken = AccessToken(exist._id);
    const refreshToken = RefreshToken(exist._id);
    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        message: "Internal Error In Token Generation",
      });
    }

    const loggedInUser = await User.findById(exist._id).select(
      "-password -refresh_token"
    );
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User Logged IN ",
        data: loggedInUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error In User Login",
    });
  }
};

export { userRegister, userLogin };
