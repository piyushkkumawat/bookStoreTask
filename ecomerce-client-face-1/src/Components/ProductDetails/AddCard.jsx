import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import {
  addtoCartproduct,
  clearError,
  getCartproduct,
} from "../../Store/Slice/cartSlice";
import { useParams } from "react-router-dom";
const AddCardComponent = () => {
  const { success } = useAppSelector((state) => state.cart);
  const { product } = useAppSelector((state) => state.productdetails);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handleAddtoCart = () => {
    dispatch(clearError());
    dispatch(addtoCartproduct(id));
  };
  useEffect(() => {
    if (success === "Cart created Sucessfully!") {
      dispatch(clearError());
      dispatch(getCartproduct());
    }
  }, [dispatch, success]);
  return (
    <div>
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mt-4">
          <button
            className={`${
              product.stock < 1
                ? "bg-gray-500 cursor-none"
                : "bg-gray-800 hover:bg-gray-900"
            }  text-white px-4 py-2 rounded-lg  focus:outline-none`}
            onClick={() => handleAddtoCart()}
            disabled={product.stock < 1}
          >
            Add to Cart
          </button>
          <ReviewCard />
          {false && (
            <button
              type="button"
              className="flex items-center text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 inline-block mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span>Add to Favorites</span>
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default AddCardComponent;
