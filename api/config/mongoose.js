import mongoose from "mongoose";

const mongooseConnection = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  });
};

export default mongooseConnection;
