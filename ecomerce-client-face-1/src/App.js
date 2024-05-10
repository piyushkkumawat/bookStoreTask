import React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar.jsx";
import GlobalLoading from "./Components/GlobalLoading/GlobalLoading.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import AdminRoute from "./utils/AdminRoute.js";
import ShopingCart from "./pages/cart/ShopingCart.js";
import Dashboard from "./Admin/pages/dashboard/Dashboard.js";
import { adminPath } from "./utils/api.js";
// import SingleOrderProvider from "./context/SingleOrderContext.js";
const Address = lazy(() => import("./pages/address/Address.js"));
const Shiping = lazy(() => import("./pages/shipingPage/Shiping.js"));
const AdminLogin = lazy(() => import("./Admin/pages/login/Login.js"));
const Signup = lazy(() => import("./pages/signup/Signup.js"));
const Login = lazy(() => import("./pages/login/Login.js"));
const Orders = lazy(() => import("./pages/orders/Orders.js"));
// const ShopingCart = lazy(() => import("./pages/cart/ShopingCart.js"));
const Account = lazy(() => import("./pages/account/Account.js"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails.js")
);
const ForgotPassword = lazy(() =>
  import("./pages/forgotPassword/ForgotPassword.js")
);
const Home = lazy(() => import("./pages/home/Home.js"));
const ProductList = lazy(() =>
  import("./Admin/pages/productList/ProductList.js")
);
const CreateProduct = lazy(() =>
  import("./Admin/pages/addProduct/CreateProduct.js")
);
const UpdateProduct = lazy(() =>
  import("./Admin/pages/updateProduct/UpdateProduct.js")
);
const OrdersList = lazy(() => import("./Admin/pages/orders/Orders.js"));
const Users = lazy(() => import("./Admin/pages/users/Users.js"));
const Review = lazy(() => import("./Admin/pages/review/Review.js"));
const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <ShopingCart />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<GlobalLoading />}>
              <Home />
            </Suspense>
          }
        />
    
        <Route
          path="/login"
          element={
            <Suspense fallback={<GlobalLoading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/productdetails/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Orders />
            </Suspense>
          }
        />

        <Route
          path="/account"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute element={<Account />} />
            </Suspense>
          }
        />
        <Route
          path="/address"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute element={<Address />} />
            </Suspense>
          }
        />
        <Route
          path="/shipping/:productId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute element={<Shiping />} />
            </Suspense>
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <Suspense>
              <ForgotPassword />
            </Suspense>
          }
        />

        {/* Admin Routes */}

        <Route
          path={`/${adminPath}/login`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<Dashboard />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/productslist`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<ProductList />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/createproduct`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<CreateProduct />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/orders`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<OrdersList />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/users`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<Users />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/reviews`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<Review />} />
            </Suspense>
          }
        />
        <Route
          path={`/${adminPath}/updateproduct/:id`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute element={<UpdateProduct />} />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
