const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000; // if port is not specified, we will use 4000
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");

dbConnect();

// it helps to get what requeste we are making, and what queries we are passing in the terminal
app.use(morgan("dev"));

// use body parser To handle HTTP POST requests in Express.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* app.use("/", (req, res) => {
  res.send("i am server.");
}); */

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);

// This middleware should be after all Routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});
