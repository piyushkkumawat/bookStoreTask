const Order = require("../models/order.model");
const errorHandler = require("../utils/error");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const mongoose = require("mongoose");
// Create Order
const CreateOrderController = async (req, res, next) => {
 
  try {
    const { products, totalAmount, status, address, name, mobile } = req.body;
    const { id: user } = req.user;
    if (!user || !products || !products.length || !totalAmount || !address) {
      return next(errorHandler(400, "All Fields are required"));
    }
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status,
      address,
      name,
      mobile,
    });

    for (const productItem of products) {
      const { product: productId, quantity } = productItem;
      // Find the product and check stock
      const product = await Product.findById(productId)
      if (!product) {
        throw errorHandler(404, `Product not found: ${productId}`);
      }
      if (product.stock < quantity) {
        throw errorHandler(
          400,
          `Insufficient stock for product: ${product.productname}`
        );
      }

      // Update stock (reduce by ordered quantity)
      product.stock -= quantity;
      await product.save({ session });
    }

    await newOrder.save({ session });
    await Cart.deleteMany({ user })

    return res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
   
    next(error);
  }
};

// Place Singal Order api
const CreateSingaleOrderController = async (req, res, next) => {
  try {
    const { products, totalAmount, status, address, name, mobile } = req.body;
    const { id: user } = req.user;
    if (!user || !products || !products.length || !totalAmount || !address) {
      return next(errorHandler(400, "All Fields are required"));
    }
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status,
      address,
      name,
      mobile,
    });

    for (const productItem of products) {
      const { product: productId, quantity } = productItem;
      // Find the product and check stock
      const product = await Product.findById(productId)
      if (!product) {
        throw errorHandler(404, `Product not found: ${productId}`);
      }
      if (product.stock < quantity) {
        throw errorHandler(
          400,
          `Insufficient stock for product: ${product.productname}`
        );
      }

      // Update stock (reduce by ordered quantity)
      product.stock -= quantity;
      await product.save();
    }

    await newOrder.save();

    return res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    next(error);
  }
};



// Get All Order of User
const getAllUserOrderController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    // const orders = await Order.find({ user: userId })
    //   .populate({
    //     path: "user",
    //     select: "username email mobile",
    //   })
    //   .populate("products.product");
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );
    return res
      .status(201)
      .json({ success: true, message: "Order List", orders });
  } catch (error) {
    next(error);
  }
};
// Admin Apis
const getAdminorderController = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email, mobile")
      .populate("products.product");
    return res
      .status(201)
      .json({ success: true, message: "Order List", orders });
  } catch (error) {
    next(error);
  }
};

//Update Order Status Api
const updateorderstatusController = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    if (
      !status ||
      !["pending", "confirmed", "shipped", "delivered"].includes(status)
    ) {
      return next(errorHandler(400, "Invalid status"));
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return next(
        errorHandler(404, `Order not found with associate ${orderId}`)
      );
    }
    return res.status(201).json({ success: true, message: "Product updated!" });
  } catch (error) {
    next(error);
  }
};

// Delete Order
const deleteOrderController = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      next(errorHandler(404, `No Order found with associated ${orderId} `));
    }

    return res.status(201).json({ success: true, message: "Product deleted!" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  CreateOrderController,
  getAllUserOrderController,
  getAdminorderController,
  updateorderstatusController,
  deleteOrderController,
  CreateSingaleOrderController,
};
