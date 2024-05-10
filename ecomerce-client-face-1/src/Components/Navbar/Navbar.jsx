import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { MdSupervisorAccount } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import "./navbar.css";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import {
  closeCart,
  getCartproduct,
  openCart,
} from "../../Store/Slice/cartSlice";
import useAuth from "../../Hook/useAuth";
import { navClose, navOpen } from "../../Store/Slice/navSlice";
import useAdmin from "../../Hook/useAdmin";
import Cookies from "js-cookie";
import AdminNavbar from "./AdminNavbar";
// import Sidebar from "../../Admin/components/sidebar/Sidebar";
const Navbar = () => {
  const isLogin = useAuth();
  const isAdmin = useAdmin();

  const { isOpen: isCartOpen, cartItems } = useAppSelector(
    (state) => state.cart
  );
  const { isnavOpen } = useAppSelector((state) => state.nav);
  const dispatch = useAppDispatch();
  const handleCardOpen = () => {
    isCartOpen ? dispatch(closeCart()) : dispatch(openCart());
  };
  const handleNavOpen = () => {
    isnavOpen ? dispatch(navClose()) : dispatch(navOpen());
  };

  useEffect(() => {
    if (isAdmin) {
      return;
    }
    const access_token = Cookies.get("access_token");
    if (access_token) {
      dispatch(getCartproduct());
    }
  }, [dispatch,isAdmin]);

  return isAdmin ? (
    <AdminNavbar />
  ) : (
    <div className="na">
      <div className="h-16 fixed top-0 w-full md:h-16 p-4 border border-gray-300 flex items-center bg-indigo-600 text-white">
        <div className="hidden md:block flex-1 p-2 font-bold text-xl ">
          <Link to="/">Book Store Application</Link>
        </div>
        <div className="md:hidden flex-1/2 p-2 font-bold text-xl ">
          <Link to="/" onClick={() => dispatch(navClose())}>
            <FaHome size={33} />
          </Link>
        </div>
        {/* <div className="flex-2 md:flex-1 ml-4">
          <div className="relative">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="Search"
              placeholder="Search for..."
              className="w-full focus:outline-none rounded-md border border-gray-500 py-2 ps-3 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <IoSearch size={23} />
              </button>
            </span>
          </div>
        </div> */}
        <div className="hidden md:flex flex-1  text-xl  justify-evenly">
          <Link to="/login">{!isLogin && "Login"}</Link>
          {isLogin && (
            <Link
              to="#"
              className="relative font-semibold "
              onClick={() => handleCardOpen()}
            >
              <TiShoppingCart size={30} className="" />
              <span
                className={`absolute -top-2 -right-5 text-sm inline-flex items-center justify-center w-7 h-7  rounded-full  ${
                  cartItems?.length > 0 ? "border border-white-500" : ""
                }`}
              >
                {cartItems?.length > 0 ? cartItems?.length : null}
              </span>
            </Link>
          )}
          {isLogin && (
            <Link to="/account">
              <MdSupervisorAccount size={30} />
            </Link>
          )}
        </div>
        <div className="md:hidden flex-1 ">
          <GiHamburgerMenu
            className="ml-auto"
            size={35}
            onClick={() => handleNavOpen()}
          />
        </div>
      </div>
      {/* Mobile View */}
      {isnavOpen && (
        <div
          className={`mobile-nav md:hidden bg-gray-300 rounded-md mt-16 py-5 px-6 gap-2 flex flex-col  align-bottom text-white text-xl fixed top-0 w-5/6 h-full transition-left`}
        >
          {!isLogin && (
            <Link
              className="block border  w-full py-2  text-center font-semibold bg-indigo-500 rounded-lg"
              to="/login"
              onClick={() => handleNavOpen()}
            >
              Login
            </Link>
          )}

          {isLogin && (
            <Link
              to="#"
              onClick={() => {
                handleNavOpen();
                handleCardOpen();
              }}
              className="flex justify-center w-full py-2 text-center relative font-semibo text-xl bg-indigo-500 rounded-lg"
            >
              <TiShoppingCart size={33} className="" />
              <span
                className={`absolute top-1 right-28 text-sm inline-flex items-center justify-center w-7 h-7  rounded-full text-white ${
                  cartItems?.length > 0 ? "border border-white-500" : ""
                } `}
              >
                {cartItems?.length > 0 ? cartItems?.length : null}
              </span>
            </Link>
          )}
          {isLogin && (
            <Link
              to="/account"
              onClick={() => handleNavOpen()}
              className="flex justify-center w-full py-2  bg-indigo-500 rounded-lg"
            >
              <MdSupervisorAccount size={33} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
