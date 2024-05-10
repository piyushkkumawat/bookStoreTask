const express = require("express");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const cookieParser = require("cookie-parser");
const Connectdb = require("./config/db");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErroHandler");
const app = express();
const bodyParser = require("body-parser");

// Middlewares
Connectdb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);


app.use(globalErrorHandler);

let PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
