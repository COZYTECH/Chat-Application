import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) {
      console.log("DB connected", conn.connection.host);
    }
  } catch (error) {
    console.log("Error in DB connection", error);
    process.exit(1); //1 stands for failure 0 stands for success
  }
};
