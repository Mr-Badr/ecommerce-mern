const User = require("../models/userModel");

const createUser = async (req, res) => {
  // First we have to check if the user already exists
  const email = req.body.email;
  const findUser = await User.findOne({email: email});

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists
    res.json({
      message: "User already exists",
      success: false,
    });
  }
};

module.exports = {createUser}
