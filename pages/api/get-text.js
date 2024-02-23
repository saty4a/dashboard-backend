import connectDB from "../../database/dbConfig";
import initMiddleWare from "../../helperFunctions/middleware";
import { getText } from "../../modules/functions.js";

export default async function handler(req, res) {
  const connection = await connectDB();
  try {
    await initMiddleWare(req, res);
    if (req.method === "GET") {
      await getText(req, res);
    } else {
      res.status(405).send({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
