import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  MdCurrencyRupee,
  MdDescription,
  MdOutlineSpellcheck,
  MdStore,
} from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import { createproductapi } from "../../../Store/Slice/adminproductSlice";
import { ErrorToast, SuccessToast } from "../../../utils/Notification";
import { clearError } from "../../../Store/Slice/authSlice";
import MetaData from "../../../utils/MetaData";
import { useParams } from "react-router-dom";
import { getproductDetais } from "../../../Store/Slice/productDetailsSlice";
import { updateproductapi } from "../../../Store/Slice/adminUpdateSlice";
const UpdateProduct = () => {
  const { id } = useParams();
  const { loading, error, success } = useAppSelector(
    (state) => state.adminupdate
  );
  const { product } = useAppSelector((state) => state.productdetails);

  const dispatch = useAppDispatch();
  const [productdata, setProductdata] = useState({
    productname: "",
    mrpprice: "",
    description: "",
    stock: "",
    istreading: "",
    discount: "",
  });

  const createProductSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(updateproductapi({ productdata, id }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductdata((prevProductdata) => ({
      ...prevProductdata, // Spread previous state
      [name]: value, // Update specific property based on name
    }));
  };
  const handleIsTreadingChange = (e) => {
    const selectedValue = e.target.value === "true"; // Convert string value to boolean
    setProductdata((prevProductdata) => ({
      ...prevProductdata, // Spread previous state
      istreading: selectedValue, // Update specific property based on name
    }));
  };

  const clearFormValues = () => {
    setProductdata({
      product: "",
      mrpprice: "",
      description: "",
      stock: "",
      istreading: "",
      discount: "",
    });
  };
  const handlePreviouseValues = () => {
    setProductdata(product);
  };

  useEffect(() => {
    dispatch(getproductDetais(id));
    handlePreviouseValues();
  }, [dispatch, error, success, id]);
  return (
    <div className="flex h-screen mt-16">
      <MetaData title={"Create Product"} />
      <Sidebar />
      <div className="w-5/6 newProductContainer bg-gray-300 p-6 flex flex-col items-center justify-center">
        <form
          className=" bg-white rounded-lg shadow-md p-8 flex flex-col space-y-4  items-center w-1/2 "
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1 className="text-2xl font-semibold">Update Product</h1>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdOutlineSpellcheck className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={productdata.productname}
              name="productname"
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdDescription className="text-gray-600 mr-2" />
            <textarea
              placeholder="Product Description"
              name="description"
              value={productdata.description}
              onChange={handleChange}
              rows="3"
              className="w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdCurrencyRupee className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="MRP Price"
              required
              name="mrpprice"
              value={productdata.mrpprice}
              onChange={handleChange}
              className="input-field w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <CiDiscount1 className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="Discount"
              required
              name="discount"
              value={productdata.discount}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdStore className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="Stock"
              required
              name="stock"
              value={productdata.stock}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdStore className="text-gray-600 mr-2" />
            <select
              value={productdata.istreading?.toString()}
              onChange={handleIsTreadingChange}
              className="w-full focus:outline-none"
            >
              <option value="">Istreading</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          {/* Images Update */}
          {/* <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              // onChange={(e) => setImage(e.target.files[0])}
              multiple
              className="w-full outline-none"
            />
          </div> */}

          {/* <div className="flex items-center justify-center w-full">
            {imagesPreview.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product Preview"
                className="w-12 h-12 object-cover rounded-full"
              />
            ))}
          </div> */}

          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            {loading ? <LoadingSpinner /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
