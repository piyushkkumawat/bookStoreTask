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

//Admin Can Update Product
// Code With Images Update
// const updateProductController = async (req, res, next) => {
//   try {
//     const { productid } = req.params;

//     const product = await Product.findById(productid);

//     if (!product) {
//       return next(
//         errorHandler(404, `Product not found with associated ID ${productid}`)
//       );
//     }

//     // Delete Existing Images
//     const BUCKET = process.env.BUCKET;
//     for (let i = 0; i < product.productImages.length; i++) {
//       const filename = product.productImages[i].split("/").pop();
//       const deleteParams = {
//         Bucket: `${BUCKET}`,
//         Key: `ProductImages/${filename}`,
//       };
//       try {
//         await s3Client.send(new DeleteObjectCommand(deleteParams));
//         console.log("Successfully deleted the image from S3.");
//       } catch (error) {
//         console.error("Error deleting the image from S3:", error);
//         next(error);
//       }
//     }

//     uploadProductImage.array("productImage")(req, res, async function (err) {
//       if (err) {
//         return next(err);
//       }
//       let paths = req.files.map((file) => file.location);
//       const { productname, price, discount, stock } = req.body;

//       if (!productname || !price || !discount || !stock) {
//         next(errorHandler(401, "All Fields are required!"));
//       }

//       // Update the product with new data
//       product.productname = productname;
//       product.price = price;
//       product.discount = discount;
//       product.stock = stock;
//       product.productImages = paths;
//       const updatedProduct = await product.save();

//       return res.status(201).json({
//         success: true,
//         message: "Product Updated successfully!",
//         updatedProduct,
//       });
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const updateProductController = async (req, res, next) => {
  try {
    const { productid } = req.params;
    const { productname, mrpprice, discount, stock, istreading, description } =
      req.body;
    const product = await Product.findById(productid);

    if (!product) {
      return next(
        errorHandler(404, `Product not found with associated ID ${productid}`)
      );
    }

    if (!productname || !mrpprice || !discount || !stock) {
      next(errorHandler(401, "All Fields are required!"));
    }

    // Update the product with new data
    product.productname = productname;
    product.mrpprice = mrpprice;
    product.discount = discount;
    product.stock = stock;
    product.description = description;
    product.istreading = istreading;
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

    const BUCKET = process.env.BUCKET;

    for (let i = 0; i < product.productImages.length; i++) {
      const filename = product.productImages[i].split("/").pop();
      const deleteParams = {
        Bucket: `${BUCKET}`,
        Key: `ProductImages/${filename}`,
      };
      try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log("Successfully deleted the image from S3.");
      } catch (error) {
        console.error("Error deleting the image from S3:", error);
        next(error);
      }
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
        productname: { $regex: productNameQuery, $options: "i" }, // Case-insensitive search
      });
    }
    const products = await baseQuery;
    // const products = await Product.find().skip(startIndex).limit(limit);

    // const products = await Product.find();

    const productsWithSellPrice = products.map((product) => {
      const sellPrice = Math.ceil(
        product.mrpprice - (product.mrpprice * product.discount) / 100
      );
      return { ...product.toObject(), sellPrice };
    });
    // return res.status(200).json({
    //   success: true,
    //   message: "Record fetched Sucessfully!",
    //   products,
    // });
    customSender(
      res,
      200,
      true,
      "Record fetched Sucessfully!",
      productsWithSellPrice
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

    const sellPrice = Math.ceil(
      product.mrpprice - (product.mrpprice * product.discount) / 100
    );

    product = { ...product.toObject(), sellPrice };
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
