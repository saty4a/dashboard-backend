import { uploadImageDetails } from "../../modules/functions";
import connectDB from "../../database/dbConfig";
import initMiddleWare from "../../helperFunctions/middleware";
import path from 'path';
import { upload } from "../../helperFunctions/imageUploader";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

await connectDB();

// const upload = uploadImages.single("file")
export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req, res) => {
  try {
    await initMiddleWare(req, res);
    if (req.method === 'POST') {
      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'your-folder-name', // Optional - folder to upload in Cloudinary
          allowed_formats: ['jpg', 'jpeg', 'png'],
          // Add any other Cloudinary parameters you need
        },
      });

      const parser = multer({ storage: storage }).single('image');
       parser(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Failed to upload image' });
        }

        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        // Return the public URL of the uploaded image
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