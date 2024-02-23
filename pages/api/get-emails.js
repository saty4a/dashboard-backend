import { getAllEmail } from "../../modules/functions";
import connectDB from "../../database/dbConfig";
import initMiddleWare from "../../helperFunctions/middleware";

export default async function handler(req, res) {
  const connection = await connectDB();

  try {
    await initMiddleWare(req, res);
    if (req.method === "GET") {
      await getAllEmail(req, res);
    } else {
      res.status(405).send({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
