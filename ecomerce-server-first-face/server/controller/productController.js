const Product = require("../models/product.model");
const errorHandler = require("../utils/error");
const customSender = require("../utils/responseHandler");
const { uploadProductImage, s3Client } = require("../utils/fileUpload");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
// Admin Work
// Admin Can Create Products
const CreateproductController = async (req, res, next) => {
  try {
    // uploadProductImage.single("productImage")(req, res, async function (err) {
     
      console.log(req.file)
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      if (!imageUrl) {
        return next(errorHandler(400, "Product image is required."));
      }
      const {
        title,
        author,
        price,
        stock,
        description,
      } = req.body;
      if (
        !title ||
        !author ||
        !price ||
        !stock ||
        !description
      ) {
        return next(errorHandler(401, "All Fields are required!"));
      }

      const newProduct = new Product({
        title,
        author,
        price,
        stock,
        description,
        productImages: [imageUrl], 
      });
      const save = await newProduct.save();
      return res
        .status(201)
        .json({
          success: true,
          message: "Product created successfully!",
          save,
        });
    // });
  } catch (error) {
    next(error);
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const { productid } = req.params;
    const { title, price, discount, stock, description } =
      req.body;
    const product = await Product.findById(productid);

    if (!product) {
      return next(
        errorHandler(404, `Product not found with associated ID ${productid}`)
      );
    }

    if (!title || !price || !discount || !stock) {
      next(errorHandler(401, "All Fields are required!"));
    }

    // Update the product with new data
    product.title = title;
    product.price = price;
    product.stock = stock;
    product.description = description;
    const updatedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product Updated successfully!",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Can Delete Product
const deleteProductController = async (req, res, next) => {
  try {
    const { productid } = req.params;

    const product = await Product.findById(productid);

    if (!product) {
      return next(
        errorHandler(404, `Product not found with associated ID ${productid}`)
      );
    }

    const isdeleted = await Product.findByIdAndDelete(productid);

    if (!isdeleted) {
      return next(
        errorHandler(404, `Product not found with associated ID ${productid}`)
      );
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// User Work
// Get All Products without token
const GetAllProductController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pagesize) || 10; //Record per page

    const startIndex = (page - 1) * limit;

    const productNameQuery = req.query.productname;
    let baseQuery = Product.find().skip(startIndex).limit(limit);

    if (productNameQuery) {
      baseQuery = baseQuery.find({
        title: { $regex: productNameQuery, $options: "i" }, // Case-insensitive search
      });
    }
    const products = await baseQuery;
   

    customSender(
      res,
      200,
      true,
      "Record fetched Sucessfully!",
      products
    );
  } catch (error) {
    next(error);
  }
};

// get Single Product
const getSingleProductController = async (req, res, next) => {
  try {
    const { productid } = req.params;
    if (!productid) {
      return next(errorHandler(400, "Id is required!"));
    }
    let product = await Product.findById(productid);

    if (!product) {
      return next(
        errorHandler(403, `No Product found with associated id ${productid}`)
      );
    }

  
    return res.status(200).json({
      success: true,
      message: "Product fetched Sucessfully!",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  CreateproductController,
  GetAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
