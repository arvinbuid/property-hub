import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected.");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB is connected.");
    connected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
