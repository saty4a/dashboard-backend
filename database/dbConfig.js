import mongoose from "mongoose";
import { dbData } from "../config";

let connection = null;

const mongoUri = `mongodb+srv://${dbData.username}:${dbData.password}@cluster0.8xs9dc5.mongodb.net/${dbData.dbName}`;

const connectDB = async () => {
  try {
  if(connection !== null) return connection;
    await mongoose.connect(mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      connection = mongoose.connection;
      connection.once("open",() => {
        console.log("connected successfully");
    })
      return connection;
  } catch (error) {
    connection.on("error", (error) => {
      console.log("Error in MongoDB connection: " + error);
  })
  }
}

export default connectDB;