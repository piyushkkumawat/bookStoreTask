const express = require("express");
const {
  CreateOrderController,
  getAllUserOrderController,
  getAdminorderController,
  updateorderstatusController,
  deleteOrderController,
  CreateSingaleOrderController,
} = require("../controller/orderController");
const { verifyToken, isAdminToken } = require("../utils/verifyUser");
const router = express.Router();
router.post("/createorder", verifyToken, CreateOrderController);
router.post("/createsingaleorder", verifyToken, CreateSingaleOrderController); //Singal Order
router.get("/getuserorder", verifyToken, getAllUserOrderController);
router.get("/admin/getorders", isAdminToken, getAdminorderController);
router.patch(
  "/admin/updateorderstatus",
  isAdminToken,
  updateorderstatusController
);
router.delete("/admin/deleteorder", isAdminToken, deleteOrderController);
module.exports = router;
