const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  // First we have to check if the user already exists
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists

    // OLED Syntax
    /* res.json({
      message: "User already exists",
      success: false,
    }); */

    // New syntax : After using express-async-handler
    throw new Error("User already exists");
  }
});

module.exports = { createUser };
