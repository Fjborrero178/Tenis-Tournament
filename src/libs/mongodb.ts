import mongoose, { Connection } from "mongoose";
/*This line imports the mongoose library and the Connection object from it*/

const  MONGODB_URI  = process.env.MONGODBURI ;/*Enviroment variable of the URI*/

if (!MONGODB_URI) {  /*Check the URI*/
  throw new Error("MONGODB_URI must be defined"); 
}


export const connectDB = async () => {  /*Database connection*/
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

