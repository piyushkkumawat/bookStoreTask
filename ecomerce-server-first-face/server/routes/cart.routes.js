const express = require("express");
const {
  addToCart,
  getCartByUser,
  deleteProductfromCart,
  reduceQuantityController,
} = require("../controller/cartController");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.post("/addtocart", verifyToken, addToCart);
router.get("/getcard", verifyToken, getCartByUser);
router.patch(
  "/cardquantutyupdate/:productId",
  verifyToken,
  reduceQuantityController
);
router.delete("/deleteproductfromcart/:id", verifyToken, deleteProductfromCart);

module.exports = router;
