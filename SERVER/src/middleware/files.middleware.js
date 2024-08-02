import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
// import cloudinary from "cloudinary";
import cloudinaryModule from "cloudinary";
// Access the v2 API directly
const cloudinary = cloudinaryModule.v2;

dotenv.config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ejercicioSeis",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

//upload image function
const upload = multer({ storage });

//delete image function
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

export { upload, deleteImgCloudinary, configCloudinary };
