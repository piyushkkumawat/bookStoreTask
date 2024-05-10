import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MetaData from "../../../utils/MetaData";
import ProductTable from "../../components/TableComponent/TableComponent";

const ProductList = () => {
  return (
    <div className="flex h-screen mt-16 border bg-indigo-400 ">
      <MetaData title={"Product List"} />
      <Sidebar />
      <div className="w-5/6 bg-gray-300 p-6 flex flex-col ">
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductList;
