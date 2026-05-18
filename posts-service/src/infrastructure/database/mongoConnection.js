import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(
        process.env.MODE === "DEV"
          ? process.env.MONGO_URI_DEV
          : process.env.MONGO_URI,
        {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          family: 4,
        },
      );
      console.log("MongoDB Connected Successfully....");
    }
  } catch (error) {
    console.log(error);
  }
}
