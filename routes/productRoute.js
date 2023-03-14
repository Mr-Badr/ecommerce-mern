const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { deleteImages } = require("../controller/uploadCtrl");

const router = express.Router();

// Only Admin can create, delete and update products
router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", authMiddleware, isAdmin, getaProduct);
router.put("/rating", authMiddleware, rating);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/:id", updateProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages); //FIXME: i have to be in uploadRoute.js, Not Here.


module.exports = router;
