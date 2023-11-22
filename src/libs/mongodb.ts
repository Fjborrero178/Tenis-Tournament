import mongoose, { Connection } from "mongoose";

const  MONGODB_URI  = process.env.MONGODBURI ;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}


export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
    return Promise.reject(error);
  }
};

