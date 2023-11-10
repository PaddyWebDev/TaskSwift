import mongoose from "mongoose";

export default async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL!);
    if (!connection) {
      console.error("Failed To Connect to MongoDB");
    }
    console.log("Connected to Database");
  } catch (error) {
    console.error(`Something goes wrong! ${error}`);
  }
}
