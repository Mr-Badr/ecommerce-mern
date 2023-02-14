const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUsers,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotpasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotpasswordToken);
router.put("/reset-password/:token", resetPassword);
// we pass authMiddleware because from it we get req.user, and from req.user we get the _id which we use in updatePassword
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/all-users", getallUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);

// Only Admin can Block users
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
