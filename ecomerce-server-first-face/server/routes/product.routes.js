const express = require("express");
const { isAdminToken, verifyToken } = require("../utils/verifyUser");
const {
  CreateproductController,
  GetAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/productController");
const { uploadProductImage } = require("../utils/fileUpload");
const router = express.Router();
// Admin Routes
// Create Product Api
// Create Product
router.post("/createproduct", isAdminToken, uploadProductImage.single("productImage"), CreateproductController);
// Update Product
router.patch(
  "/updateproduct/:productid",
  isAdminToken,
  updateProductController
);

// Delete Product
router.delete(
  "/deleteproduct/:productid",
  isAdminToken,
  deleteProductController
);

// =============// User Routes And Public Routes
// Get All Products without token for admin and all User
router.get("/getallproduct", GetAllProductController);
// Get Single Product by id
router.get("/getsingleproduct/:productid", getSingleProductController);
module.exports = router;
