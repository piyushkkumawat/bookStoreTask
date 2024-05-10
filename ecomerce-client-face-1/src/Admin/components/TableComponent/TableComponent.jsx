import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { getproducts } from "../../../Store/Slice/productSlice";
import {
  clearError,
  deleteproductapi,
  handledeleteProduct,
} from "../../../Store/Slice/adminproductSlice";
import { ErrorToast } from "../../../utils/Notification";
import { adminPath } from "../../../utils/api";
const ProductTable = () => {
  const dispatch = useAppDispatch();
  const { product, isdeleted } = useAppSelector((state) => state.adminproduct);
  const [isClicked, setIsclicked] = useState("");

  const handledelete = (id) => {
    setIsclicked(id);
    dispatch(deleteproductapi(id));
  };

  useEffect(() => {
    dispatch(getproducts());
    dispatch(clearError());
  }, [dispatch]);
  useEffect(() => {
    dispatch(clearError());
    if (isdeleted) {
      dispatch(handledeleteProduct(isClicked));
      ErrorToast(isdeleted);
      dispatch(clearError());
    }
  }, [dispatch, isClicked, isdeleted]);
  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg font-semibold">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-md text-white bg-black uppercase   ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              MRP Price
            </th>
            <th scope="col" className="px-6 py-3">
              Sell Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount %
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" bg-white text-black  ">
          {product.map((product) => (
            <tr
              key={product._id}
              className="even:bg-gray-500  even:text-white  odd:bg-white odd:text-black   border-b border-gray-700"
            >
              <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                {product.productname}
              </td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{product.mrpprice}</td>
              <td className="px-6 py-4">{product.sellPrice}</td>
              <td className="px-6 py-4">{product.discount}</td>
              <td className="px-6 py-4 flex justify-evenly ">
                <Link
                  to={`/${adminPath}/updateproduct/${product._id}`}
                  className="font-medium px-2 text-green-500 hover:underline"
                >
                  Update
                </Link>
                <Link
                  href="#"
                  className="font-medium px-2 text-red-500 hover:underline"
                  onClick={() => {
                    handledelete(product._id);
                  }}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
