import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import {
  handleAmount,
  handleProduct,
} from "../../Store/Slice/singalOrderStateSlice";
import imageConstant from "../../assests/Product/1715322925581.jpg";

const ShipingProduct = () => {
  const { product } = useAppSelector((state) => state.productdetails);
  const { totalAmount:totalPrice } = useAppSelector((state) => state.singalOrder);
  const { price } = product;
  const [quantity, setQuantity] = useState(1);
  const [totalmrpprice, setTotalmrpprice] = useState(0);
  const dispatch = useAppDispatch();

  const handleIcrement = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    let _totalPrice = price * quantity;
    dispatch(handleAmount(_totalPrice));
    let _totalmrpprice = price * quantity;
    setTotalmrpprice(_totalmrpprice);
    dispatch(handleProduct({ product: product._id, quantity: quantity }));
  }, [quantity, price]);
  return (
    <div className="pointer-events-auto  max-w-md m-auto">
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1  px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-medium text-gray-900">
              Shiping Details
            </h1>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                <div className="p-4 ">
                  <div className="bg-white rounded-lg  overflow-hidden">
                   
                      <img
                        src={imageConstant}
                        alt={product.productImages[0]}
                        className="h-32 md:h-48 w-3/4 m-auto object-contain"
                      />
                    <div className="p-4">
                      <h3 className="text-gray-900 font-semibold text-lg">
                        {product.productname}
                      </h3>
                      {/* <BuyNowPanel /> */}
                      {/* <ReviewSection rating={rating} reviewCount={reviewCount} /> */}
                      <div className="flex justify-between">
                        <p className="mt-2 text-gray-900">
                          <span className="text-3xl font-bold">
                            {" "}
                            ₹{product.price}{" "}
                          </span>
                          
                        </p>
                        <p className="mt-2 text-gray-900  flex justify-around w-24 shadow-md">
                          <span className="text-xl my-auto cursor-pointer ">
                            <TiMinus onClick={() => handleDecrement()} />
                          </span>
                          <span className="text-xl text-indigo-600 font-medium my-auto  ">
                            {quantity}
                          </span>
                          <span className="text-xl my-auto cursor-pointer ">
                            <FaPlus onClick={() => handleIcrement()} />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-500 px-12 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total :</p>
            <p>₹ {totalPrice}</p>
          </div>
          <div className="flex justify-end gap-2 text-base font-medium text-gray-900">
            <p className="font-medium text-black">
              You Save ₹ {totalmrpprice - totalPrice}
            </p>

            <p className="line-through font-bold text-red-500">
              ₹{totalmrpprice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipingProduct;
