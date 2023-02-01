const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

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

// Create login controller
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user already exists && we send the second argument to userModel file to check the password
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      _filename: findUser?._filename,
      _lastname: findUser?._lastname,
      _email: findUser?._email,
      _mobile: findUser?._mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credentials: " + password);
  }
});

module.exports = { createUser, loginUserCtrl };
