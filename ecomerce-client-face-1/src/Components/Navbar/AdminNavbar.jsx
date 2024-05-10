import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { Link } from "react-router-dom";
import { navClose, navOpen } from "../../Store/Slice/navSlice";
import { FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../../Hook/useAdmin";
import useAuth from "../../Hook/useAuth";
import { TiShoppingCart } from "react-icons/ti";
import {
  closeCart,
  openCart,
} from "../../Store/Slice/cartSlice";

const AdminNavbar = () => {
  const isAdmin = useAdmin();
  const isLogin = useAuth();
  const dispatch = useAppDispatch();
  const { isOpen: isCartOpen, cartItems } = useAppSelector(
    (state) => state.cart
  );
  const { isnavOpen } = useAppSelector((state) => state.nav);
  const handleCardOpen = () => {
    isCartOpen ? dispatch(closeCart()) : dispatch(openCart());
  };
  const handleNavOpen = () => {
    isnavOpen ? dispatch(navClose()) : dispatch(navOpen());
  };

  return (
    <div className="na">
      <div className="h-16 fixed top-0 w-full md:h-16 p-4 flex items-center bg-indigo-600 text-white">
        <div className="hidden md:block flex-1 p-2 font-bold text-xl ">
          <Link to="/">Ecomerce Admin</Link>
        </div>
        <div className="md:hidden flex-1/2 p-2 font-bold text-xl ">
          <Link to="/" onClick={() => dispatch(navClose())}>
            <FaHome size={33} />
          </Link>
        </div>
        <div className="flex-2 md:flex-1 ml-4">
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
        </div>
        <div className="hidden md:flex flex-1  text-xl  justify-evenly">
          <Link to="/login">{!isAdmin && "Login"}</Link>
          {isAdmin && (
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
              <span className="absolute top-1 right-28 text-sm inline-flex items-center justify-center w-7 h-7 border border-white rounded-full text-white ">
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

export default AdminNavbar;
