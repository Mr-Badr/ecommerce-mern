const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000; // if port is not specified, we will use 4000

app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});
