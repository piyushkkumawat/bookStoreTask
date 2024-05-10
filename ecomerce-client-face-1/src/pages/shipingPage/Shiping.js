import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import ShipingForm from "../../Components/Shiping/ShipingForm";
import ShipingProduct from "../../Components/Shiping/ShipingProduct";
import { getproductDetais } from "../../Store/Slice/productDetailsSlice";
const Shiping = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product } = useAppSelector((state) => state.productdetails);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!Object.keys(product).length) {
      dispatch(getproductDetais(productId));
    }
  }, [navigate, product, productId]);
  return (
    <>
      {Object.keys(product).length && (
        <>
          <div className="mt-24  flex flex-col lg:flex-row  gap-0   justify-center ">
            <div className="lg:w-1/2">
              <ShipingProduct />
            </div>

            {/* Product Details */}
            <div className="flex justify-center pt-2  lg:w-1/2 ">
              <ShipingForm />
            </div>
          </div>
          <div className="m-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                // onClick={() => handleCardOpen()}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Shiping;
