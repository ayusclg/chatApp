import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import uploadImage from "../utils/multer.js";

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
    // if (!gender.includes(["male", "female", "others"])) {
    //   return res.status(403).json({
    //     message: "Gender NotValid",
    //   });
    // }

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

export { userRegister };
