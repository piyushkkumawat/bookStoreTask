import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImagePanel from "../../Components/ProductDetails/ProductImagePanel";
import ProductDetailsPanel from "../../Components/ProductDetails/ProductDetailsPanel";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { getproductDetais } from "../../Store/Slice/productDetailsSlice";
import { getCartproduct } from "../../Store/Slice/cartSlice";
// Product Image Tabs Component
const ProductImageTabs = () => {
  const { id } = useParams();
  const { product } = useAppSelector((state) => state.productdetails);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getproductDetais(id));
    dispatch(getCartproduct());
  }, [dispatch, id]);
  return (
    <div className="p-4  md:h-full ">
      <ProductImagePanel productImages={product?.productImages} />
    </div>
  );
};

const ProductDetails = () => {
  return (
    <div className="mt-24  flex flex-col lg:flex-row  gap-8   ">
      <div className="lg:w-1/2  ">
        <ProductImageTabs />
      </div>

      {/* Product Details */}
      <div className="flex justify-center pt-2  lg:w-1/2">
        <ProductDetailsPanel />
      </div>
    </div>
  );
};

export default ProductDetails;
