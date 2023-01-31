const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000; // if port is not specified, we will use 4000
const authRouter = require("./routes/authRoute");

dbConnect();

// use body parser To handle HTTP POST requests in Express.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

/* app.use("/", (req, res) => {
  res.send("i am server.");
}); */

app.use("/api/user", authRouter);

app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});