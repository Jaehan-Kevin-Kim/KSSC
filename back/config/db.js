const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoURI: ", process.env.MONGO_URI);
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB Connected: ${(await conn).connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
