import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import {
  handleAddress,
  handleMobile,
  handleName,
  handleResetState,
} from "../../Store/Slice/singalOrderStateSlice";
import { clearError, createSingaleOrder } from "../../Store/Slice/orderSlice";
import { ErrorToast, SuccessToast } from "../../utils/Notification";

const ShipingForm = () => {
  const navigate = useNavigate();
  const { product } = useAppSelector((state) => state.productdetails);

  const { address, name, mobile } = useAppSelector(
    (state) => state.singalOrder
  );
  const order = useAppSelector((state) => state.singalOrder);
  const { loading, success, error } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      dispatch(handleName(value));
    }
    if (name === "mobile") {
      dispatch(handleMobile(value));
    }
    if (name === "address") {
      dispatch(handleAddress(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearError());
    dispatch(createSingaleOrder(order));
  };

  useEffect(() => {
    if (success) {
      SuccessToast(success);
      dispatch(handleResetState());
      dispatch(clearError());
      navigate("/");
    }
    if (error) {
      ErrorToast(error);
      dispatch(clearError());
    }
  }, [dispatch, success, error]);
  return (
    <>
      {/* <div className="border-t border-gray-300 my-4" /> */}
      <div className="flex items-center justify-center w-full ">
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
                value={name}
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
                value={mobile}
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
                value={address}
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
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                product.stock < 1 ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
              }   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={product.stock < 1}
            >
              {loading ? <LoadingSpinner /> : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShipingForm;
