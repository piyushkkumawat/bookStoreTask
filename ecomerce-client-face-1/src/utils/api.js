export const baseUrl = "http://localhost:5001";
export const adminPath = "";

export const signupapi = `${baseUrl}/api/auth/signup`;
export const loginapi = `${baseUrl}/api/auth/signin`;
// Product Api
export const getallproduct = `${baseUrl}/api/product/getallproduct`;
export const getallproductDetails = `${baseUrl}/api/product/getsingleproduct`;
// Admin Api
export const createproduct = `${baseUrl}/api/product/createproduct`;
export const deleteproduct = `${baseUrl}/api/product/deleteproduct`;
export const updateproductapipath = `${baseUrl}/api/product/updateproduct`;

// Cart Details
export const getCartproductapi = `${baseUrl}/api/cart/getcard`;
export const addtoCartproductapi = `${baseUrl}/api/cart/addtocart`;
export const _removetoCart = `${baseUrl}/api/cart/deleteproductfromcart`;
export const _updateQuantity = `${baseUrl}/api/cart/cardquantutyupdate`;

// Order Details
export const _createorderapi = `${baseUrl}/api/order/createorder`;
export const _createsingaleorderapi = `${baseUrl}/api/order/createsingaleorder`;
