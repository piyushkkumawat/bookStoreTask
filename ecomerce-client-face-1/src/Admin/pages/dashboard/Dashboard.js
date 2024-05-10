import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MetaData from "../../../utils/MetaData";

const Dashboard = () => {
  return (
    <div className="flex h-screen mt-16 border bg-indigo-400 ">
      <MetaData title={"Dashboard"} />
      <Sidebar />
      <div className="w-5/6 newProductContainer bg-gray-300 p-6 flex flex-col items-center justify-center">
        Admin Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
