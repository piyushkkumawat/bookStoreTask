const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const errorHandler = require("../utils/error");
const mongoose = require("mongoose");
// Add to Cart Product
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { id: userId } = req.user;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHandler(400, "Invalid user ID"));
    }
    // Check if the product exists
    if (!productId) {
      return next(errorHandler(404, "Product ID is required"));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(
        errorHandler(404, `No Product found with associated id ${productId}`)
      );
    }

    if (product.stock < quantity) {
      throw errorHandler(
        400,
        `Insufficient stock for product: ${product.title}`
      );
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If cart does not exist for the user, create a new one
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: quantity }],
      });
    } else {
      // If cart already exists for the user, update the items array
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (!existingItem) {
        cart.items.push({ product: productId, quantity: quantity });
      }
    }

    // Save the cart item
    await cart.save();
    return res.status(201).json({
      success: true,
      message: "Cart created Sucessfully!",
      // data: cart,
    });
  } catch (error) {
    next(error);
  }
};
// Get All Card Details
const getCartByUser = async (req, res, next) => {
  try {
    let { id: userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHandler("400", "Invalid user ID"));
    }
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    return res.status(201).json({
      success: true,
      message: "Cart Details!",
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete Product from cart Details
const deleteProductfromCart = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    let { id: userId } = req.user;
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .exec();
    if (!cart) {
      return next(errorHandler(404, "Cart not found for the user"));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );
    if (itemIndex === -1) {
      return next(errorHandler(404, "Product not found in the cart"));
    }
    cart.items.splice(itemIndex, 1);


    return res.status(201).json({
      success: true,
      message: "Item Removed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Reduce Quantity on a product
const reduceQuantityController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.params;
    const { newQuantity } = req.body;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .exec();

    if (!cart) {
      return next(errorHandler(404, "Cart not found for the user"));
    }
    const cartItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );
    if (!cartItem) {
      next(errorHandler(404, "Product not found in the cart"));
    }

    // Otherwise, update the item's quantity
    if (newQuantity > 0) {
      cartItem.quantity = newQuantity;
    } else {
      throw errorHandler(
        400,
        "Invalid quantity. Quantity must be greater than 0."
      );
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Cart Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCartByUser,
  deleteProductfromCart,
  reduceQuantityController,
};
