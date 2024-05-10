import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { Link, useNavigate } from "react-router-dom";
import { clearError, createOrder } from "../../Store/Slice/orderSlice";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import { ErrorToast, SuccessToast } from "../../utils/Notification";
import { getCartproduct } from "../../Store/Slice/cartSlice";
const Address = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  const { loading, success, error } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const transformCartItems = (items) => {
    return items?.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });
  };
  const [order, setOrder] = useState({
    products: [],
    address: "",
    totalAmount: totalPrice,
    name: "",
    mobile: "",
  });

  useEffect(() => {
    setOrder((prev) => {
      return {
        ...prev,
        products: transformCartItems(cartItems),
        totalAmount: totalPrice,
      };
    });
  }, [cartItems, totalPrice]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(clearError());
    dispatch(createOrder(order));
    dispatch(getCartproduct(order));
  };

  useEffect(() => {
    const handleClearForm = () => {
      setOrder({
        products: [],
        address: "",
        totalAmount: totalPrice,
        name: "",
        mobile: "",
      });
    };
    if (success === "Order placed successfully!") {
      handleClearForm();
      SuccessToast("Order placed successfully!");
      dispatch(clearError());
      dispatch(getCartproduct());
      navigate("/orders");
    }
    if (error) {
      ErrorToast(error);
      dispatch(clearError());
    }
  }, [dispatch, success, totalPrice, navigate, error]);

  return (
    <div className="mt-16">
      <div className="min-h-screen flex items-center justify-center w-full ">
        <div className="bg-white  shadow-2xl rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 ">
            Shipping Address!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                <span className={`cursor-pointer ${"text-indigo-600"}`}>
                  {" "}
                  Name
                </span>{" "}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={order.name}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Name"
                autoComplete="name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                <span className={`cursor-pointer ${"text-indigo-600"}`}>
                  {" "}
                  Mobile
                </span>{" "}
              </label>
              <input
                type="text"
                id="number"
                name="mobile"
                value={order.mobile}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                placeholder="9876543210"
                autoComplete="number"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={order.address}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your address"
                autoComplete="address"
              />

              <Link
                to="#"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Shipping Address
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? <LoadingSpinner /> : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
