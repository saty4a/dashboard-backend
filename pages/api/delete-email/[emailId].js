import connectDB from "../../../database/dbConfig";
import initMiddleWare from "../../../helperFunctions/middleware";
import  {deleteEmail}  from "../../../modules/functions.js";

await connectDB();

export default async function handler(req, res) {
  
  try {
    await initMiddleWare(req, res);
    if (req.method === "DELETE") {
      await deleteEmail(req, res, req.query.emailId);
    } else {
      res.status(405).send({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
