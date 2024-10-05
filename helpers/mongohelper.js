import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw "Missing MONGODB_URI in env";
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "eric-kugel",
    });
  } catch (error) {
    console.log(error);
  }
};
