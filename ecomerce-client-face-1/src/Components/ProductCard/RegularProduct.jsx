import React from "react";
import RegularProductCard from "./RegularProductCard";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Store/store";

const RegularProducts = () => {
  const { product } = useAppSelector((state) => state.product);

  return (
    <div className="alm p-4">
      <h2 className="text-2xl font-semibold mb-4 ps-4">Regular Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product?.map((product) => {
          return <RegularProductCard key={product._id} {...product} />;
        })}
      </div>

    </div>
  );
};

export default RegularProducts;
