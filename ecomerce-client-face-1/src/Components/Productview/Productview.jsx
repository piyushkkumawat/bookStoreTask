import React, { useEffect } from "react";
import RegularProducts from "../ProductCard/RegularProduct";
import { getproducts } from "../../Store/Slice/productSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
const Productview = () => {
  const dispatch = useAppDispatch();
  const {  product } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);
  console.log("product", product);
  return (
    <div className="mt-16">
      {product.length <= 0 ? (
        <h1 className="mt-6 text-center  p-3 md:ps-9 text-3xl font-bold tracking-tight text-indigo-600">
          No Product Found
        </h1>
      ) : (
        <>
          <h1 className="mt-6  p-3 md:ps-9 text-3xl font-bold tracking-tight text-indigo-600">
            Product Lists
          </h1>
          <RegularProducts />
        </>
      )}
    </div>
  );
};

export default Productview;
