import multer from "multer";
import cloudinary from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = multer.memoryStorage();

export const Upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const uploadImage = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64"); 
    const uri = `data:${file.mimetype};base64,${b64}`;

    const response = await cloudinary.v2.uploader.upload(uri, {
      resource_type: "auto",
      folder: "Chatapp",
    });

    console.log("successfully uploaded in cloudinary");
    return response.secure_url;
  } catch (error) {
    console.log("error in uploading image", error);
    throw error;
  }
};


export default uploadImage;
