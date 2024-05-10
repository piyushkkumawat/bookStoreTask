import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, signup } from "../../Store/Slice/authSlice";
import { ErrorToast, SuccessToast } from "../../utils/Notification";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFormValues = () => {
    setUser({
      username: "",
      email: "",
      mobile: "",
      password: "",
    });
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!user.username.trim()) {
      newErrors.username = "User name is required";
    } else if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!user.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!user.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(signup(user));
    clearFormValues();
  };
  useEffect(() => {
    if (error) {
      ErrorToast(error);
    }
    if (success) {
      SuccessToast(success);
      navigate("/login");
    }
    dispatch(clearError());
  }, [dispatch, error, success, navigate]);
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                User name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Deo"
                onChange={handleChange}
                // required
              />
              {errors.username && (
                <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {errors.username}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@gmail.com"
                onChange={handleChange}
                // required
              />
              {errors.email && (
                <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={user.mobile}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="8989989808"
                onChange={handleChange}
                // required
              />
              {errors.mobile && (
                <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {errors.mobile}
                </span>
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
                value={user.password}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                onChange={handleChange}
                // required
              />

              {errors.password && (
                <span className="text-xs text-red-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {errors.password}
                </span>
              )}
              <Link
                to="/login"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login in Your Account?
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
                href="#"
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* Create Account */}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? <LoadingSpinner /> : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
