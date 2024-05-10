import React, { useEffect } from "react";
// import ReviewCard from "./ReviewCard";
import AddCardComponent from "./AddCard";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { getCartproduct } from "../../Store/Slice/cartSlice";
import BuyNowPanel from "../ProductCard/BuyNowPanel";

const ProductDetailsPanel = () => {
  const { product } = useAppSelector((state) => state.productdetails);
  const { title, price, author, stock, description } = product;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCartproduct());
  }, [dispatch]);

  return (
    <div className="p-4 md:pt-16   md:p-6">
      <div className="pt-3 p-2 md:pt-16  bg-white rounded-lg overflow-hidden shadow-md ">
        <span className="text-2xl font-semibold text-gray-800 px-4 pt-4">
          {title}
        </span>

        <BuyNowPanel stock={stock} />
        <div className="flex justify-between items-center px-4 py-2">
          <div>
            <h2 className="text-gray-600 text-lg font-semibold">
              Product Information
            </h2>
            <p className="mt-2 text-gray-900">
              <span className="text-3xl font-bold"> ₹{price} </span>
            </p>
          </div>
        </div>
        <div className="px-4 py-2">
          <h3 className="text-gray-600 text-lg font-semibold">Description</h3>
          <p className="text-gray-800 text-base px-2">
            {description}
          </p>
        </div>
        <AddCardComponent />
      </div>
    </div>
  );
};

export default ProductDetailsPanel;
