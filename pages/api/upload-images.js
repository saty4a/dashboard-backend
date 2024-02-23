import { uploadImageDetails } from "../../modules/functions";
import connectDB from "../../database/dbConfig";
import initMiddleWare from "../../helperFunctions/middleware";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from 'cloudinary';
import { cloudinaryData } from "../../config";

await connectDB();

export const config = {
  api: {
    bodyParser: false
  }
};

cloudinary.config({
  cloud_name: cloudinaryData.cloudName,
  api_key: cloudinaryData.apiKey,
  api_secret: cloudinaryData.apiSecret,
  secure: true,
});



const handler = async (req, res) => {
  try {
    await initMiddleWare(req, res);
    if (req.method === 'POST') {
      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'assignment',
          allowed_formats: ['jpg', 'jpeg', 'png'],
          upload_preset: "nszfgg5g",
        },
      });
      
      const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, }).single('image');
      
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Failed to upload image' });
        }

        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const imageUrl = file.path;
        await uploadImageDetails(req, res, imageUrl);
      });
    } else {
      res.status(405).send({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;