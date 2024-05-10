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
import {
  clearError,
  createproductapi,
} from "../../../Store/Slice/adminproductSlice";
import { ErrorToast, SuccessToast } from "../../../utils/Notification";
import MetaData from "../../../utils/MetaData";

const CreateProduct = () => {
  const { loading, error, success } = useAppSelector(
    (state) => state.adminproduct
  );

  const dispatch = useAppDispatch();
  const [productname, setProductname] = useState("");
  const [mrpprice, setMrpprice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [istreading, setIstreading] = useState("");
  const [discount, setDiscount] = useState("");
  const [costprice, setCostprice] = useState("");
  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);

  const createProductSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("mrpprice", mrpprice);
    formData.append("discount", discount);
    formData.append("costprice", costprice);
    formData.append("stock", stock);
    formData.append("description", description);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("productImage", images[i]);
      }
    }
    dispatch(createproductapi(formData));
  };

  const handleIsTreadingChange = (e) => {
    const selectedValue = e.target.value === "true"; // Convert string value to boolean
    setIstreading(selectedValue); // Update istreading state
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      setImages((old) => [...old, file]);

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          // setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const clearFormValues = () => {
    setProductname("");
    setMrpprice("");
    setDescription("");
    setStock("");
    setIstreading("");
    setDiscount("");
    setImages([]);
    setImagesPreview([]);
  };
  useEffect(() => {
    dispatch(clearError());

    if (error) {
      ErrorToast(error);
      dispatch(clearError());
    }
    if (success) {
      dispatch(clearError());
      SuccessToast(success);
      clearFormValues();
    }
  }, [dispatch, error, success]);
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
          <h1 className="text-2xl font-semibold">Create Product</h1>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdOutlineSpellcheck className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdDescription className="text-gray-600 mr-2" />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={mrpprice}
              onChange={(e) => setMrpprice(e.target.value)}
              className="input-field w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdCurrencyRupee className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="Cost Price"
              required
              value={costprice}
              onChange={(e) => setCostprice(e.target.value)}
              className="input-field w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <CiDiscount1 className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="Discount"
              required
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdStore className="text-gray-600 mr-2" />
            <input
              type="number"
              placeholder="Stock"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <MdStore className="text-gray-600 mr-2" />
            <select
              value={istreading.toString()}
              onChange={handleIsTreadingChange}
              className="w-full focus:outline-none"
            >
              <option value="">Istreading</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div className="flex items-center w-full justify-center p-1 text-xl border border-gray-500 rounded-md">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              // onChange={(e) => setImage(e.target.files[0])}
              multiple
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center justify-center w-full">
            {imagesPreview.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product Preview"
                className="w-12 h-12 object-cover rounded-full"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
