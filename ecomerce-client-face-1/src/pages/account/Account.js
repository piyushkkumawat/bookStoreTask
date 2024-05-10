import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("isLogin");
    Cookies.remove("access_token");
    navigate("/");
  };
  return (
    <div className="mt-16">
      <button
        className="p-3 border border-indigo-600"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
