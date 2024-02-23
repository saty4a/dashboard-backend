import { uploadEmail } from "../../modules/functions";
import connectDB from "../../database/dbConfig";
import initMiddleWare from "../../helperFunctions/middleware";

await connectDB();

export default async function handler(req, res) {
    try {
        await initMiddleWare(req, res);
        if (req.method === 'POST') {
          await uploadEmail(req, res);
        } else {
          res.status(405).send({ message: 'Method Not Allowed' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}
