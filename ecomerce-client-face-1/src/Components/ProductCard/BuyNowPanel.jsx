import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { getproductDetais } from "../../Store/Slice/productDetailsSlice";

const BuyNowPanel = ({ prodictId, stock }) => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBuyNowClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (e.g., form submission)
    event.stopPropagation(); // Prevent event from bubbling up to parent components

    if (prodictId) {
      dispatch(getproductDetais(prodictId));
    }
    navigate(`/shipping/${prodictId}`);
  };

  return (
    <button
      type="submit"
      className={`${
        stock < 1 ? "bg-gray-500 cursor-none" : "bg-gray-800 hover:bg-gray-900"
      } text-white mt-2 px-2 py-2 rounded-lg  focus:outline-none`}
      onClick={handleBuyNowClick}
    >
      Buy Now
    </button>
  );
};

export default BuyNowPanel;
