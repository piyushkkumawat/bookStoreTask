import React from "react";
import { Link } from "react-router-dom";
import {
  MdPostAdd,
  MdOutlineCreateNewFolder,
  MdRateReview,
  MdDashboard,
} from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { adminPath } from "../../../utils/api";

const Sidebar = () => {
  return (
    <div className="sidebar bg-indigo-400 h-full flex flex-col p-4 w-1/6  text-white font-semibold gap-7">
      <Link to={`/${adminPath}`} className="text-2xl font-bold m-auto">
        Sanvariya Admin
      </Link>
      <Link
        to={`/${adminPath}`}
        className="text-lg flex items-center w-full p-4"
      >
        <MdDashboard size={25} className="mr-2" /> Dashboard
      </Link>
      <Link
        to={`/${adminPath}/productslist`}
        className="text-lg flex items-center w-full p-4"
      >
        <MdOutlineCreateNewFolder size={25} className="mr-2" />
        Product List
      </Link>
      <Link
        to={`/${adminPath}/createproduct`}
        className="text-lg flex items-center w-full p-4"
      >
        <MdPostAdd size={25} className="mr-2" /> Add New Product
      </Link>
      <Link
        to={`/${adminPath}/orders`}
        className="text-lg flex items-center w-full p-4"
      >
        <FaListAlt size={25} className="mr-2" /> Orders
      </Link>
      <Link
        to={`/${adminPath}/users`}
        className="text-lg flex items-center w-full p-4"
      >
        <BsPeopleFill size={25} className="mr-2" /> Users
      </Link>
      <Link
        to={`/${adminPath}/reviews`}
        className="text-lg flex items-center w-full p-4"
      >
        <MdRateReview size={25} className="mr-2" /> Reviews
      </Link>
    </div>
  );
};

export default Sidebar;
