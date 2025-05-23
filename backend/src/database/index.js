import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const dbConnect = async () => {
  try {
    const mongoInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      `mongoDB Connected successfully`,
      mongoInstance.connection.host
    );
  } catch (error) {
    console.log("error in database connection", error);
    process.exit(1);
  }
};
