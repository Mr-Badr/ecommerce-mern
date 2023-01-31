const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", true);
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database Error: " + error);
  }
};

module.exports = dbConnect;