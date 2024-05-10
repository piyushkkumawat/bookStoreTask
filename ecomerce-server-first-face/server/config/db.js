const mongoose = require("mongoose");
const Connectdb = async () => {
  try {
    const url = "mongodb://0.0.0.0:27017/book-store";
    const { connection } = await mongoose.connect(url);
    console.log(`Mongodb Connected ${connection.host} ${connection.name}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = Connectdb;
