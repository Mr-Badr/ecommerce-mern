const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Only Admin can create, delete and update products
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", authMiddleware, isAdmin, getaProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/:id", updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
