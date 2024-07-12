import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${dbConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
