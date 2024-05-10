import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { clearError, login } from "../../Store/Slice/authSlice";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
// import { ErrorToast, SuccessToast } from "../../Components/Notification";
import { COOKIES_EXPIRES } from "../../../utils/constant";
import Cookies from "js-cookie";
import { adminPath, loginapi } from "../../../utils/api";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();

  const { loading, error, success, access_token } = useSelector(
    (state) => state.auth
  );
  const [loginform, setLoginform] = useState({
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
    password: "",
  });
  const [loginType, setLoginType] = useState("email");

  const handleTypeChange = (type) => {
    setLoginType(type);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setLoginform((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clearFormValues = () => {
    setLoginform({
      email: "",
      mobile: "",
      password: "",
    });
    setErrors({
      email: "",
      mobile: "",
      password: "",
    });
  };

  const handleLogin = async (loginform) => {
    try {
      const { data } = await axios.post(loginapi, loginform);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + COOKIES_EXPIRES);
      // expirationDate.setMinutes(expirationDate.getMinutes() + 10);

      if (data) {
        Cookies.set("access_token", data.access_token, {
          expires: expirationDate,
        });
        if (data.rest.isAdmin) {
          Cookies.set("isAdmin", "true", { expires: expirationDate });
          navigate(`/${adminPath}`);
        }
      }
    } catch (error) {
      console.log("error :>> ", error && error.response);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (loginType === "email") {
      if (!loginform.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!loginform.password.trim()) {
        newErrors.password = "Password is required";
      }
    }
    if (loginType === "mobile") {
      if (!loginform.mobile.trim()) {
        newErrors.mobile = "Mobile Number is required";
      } else if (!loginform.password.trim()) {
        newErrors.password = "Password is required";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleLogin(loginform);
    // dispatch(login(loginform));
    clearFormValues();
  };

  // useEffect(() => {
  //   if (error) {
  //     ErrorToast(error);
  //   }
  //   if (success) {
  //     SuccessToast(success);
  //     const expirationDate = new Date();
  //     expirationDate.setDate(expirationDate.getDate() + COOKIES_EXPIRES);
  //     // expirationDate.setMinutes(expirationDate.getMinutes() + 10);
  //     Cookies.set("isLogin", "true", { expires: expirationDate });
  //     Cookies.set("access_token", access_token, { expires: expirationDate });
  //     navigate("/");
  //   }
  //   dispatch(clearError());
  // }, [dispatch, error, success, navigate, access_token]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full ">
        <div className="bg-white  shadow-2xl rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 ">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                <span
                  className={`cursor-pointer ${
                    loginType === "email" ? "text-indigo-600" : ""
                  }`}
                  onClick={() => handleTypeChange("email")}
                >
                  Email
                </span>{" "}
                Or
                <span
                  className={`cursor-pointer ${
                    loginType === "mobile" ? "text-indigo-600" : ""
                  }`}
                  onClick={() => handleTypeChange("mobile")}
                >
                  {" "}
                  Mobile
                </span>{" "}
              </label>
              {loginType === "email" ? (
                <>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginform.email}
                    onChange={handleChange}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {errors.email}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={loginform.mobile}
                    onChange={handleChange}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Mobile"
                  />
                  {errors.mobile && (
                    <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {errors.mobile}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginform.password}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {errors.password}
                </span>
              )}

              <Link
                to="/forgotpassword"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                  checked
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700 "
                >
                  Remember me
                </label> */}
              </div>
              <Link
                to="/signup"
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </Link>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? <LoadingSpinner /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
