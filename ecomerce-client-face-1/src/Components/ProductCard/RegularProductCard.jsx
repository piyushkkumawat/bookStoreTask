import React from "react";
import BuyNowPanel from "./BuyNowPanel";
import { Link } from "react-router-dom";
import imageConstant from "../../assests/Product/1715322925581.jpg";

const RegularProductCard = ({
  _id,
  title,
  price,
  description,
  productImages,
  stock,
}) => {
  return (
    <Link
      to={`/productdetails/${_id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={imageConstant}
        alt={productImages[0]}
        className="w-full m-auto md:w-full h-48  md:h-64 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 flex align-center justify-between">
          {title}
          <BuyNowPanel prodictId={_id} stock={stock} />
        </h3>
        <p className="text-gray-600 mb-1">{description}</p>
        {/* <p className="text-lg font-semibold">$75</p> */}
        <p className="mt-2 text-gray-900">
          <span className="text-xl font-medium m-1">MRP</span>
          <span className="text-xl font-medium text-red-500 ">
            ₹{price}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default RegularProductCard;
