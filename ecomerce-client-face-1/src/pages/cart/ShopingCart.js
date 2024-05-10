import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline"; //npm install @heroicons/react
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import {
  clearError,
  closeCart,
  handletotalPrice,
  openCart,
  removeFromCart,
  updateQuantityApi,
} from "../../Store/Slice/cartSlice";

export default function Example() {
  const { isOpen: isCartOpen, cartItems: products } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const handleCardOpen = () => {
    isCartOpen ? dispatch(closeCart()) : dispatch(openCart());
  };
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const handlePriceCalculate = () => {
      let _price = 0;
      products &&
        products.length &&
        products?.forEach((product) => {
          const details = product.product;
          console.log(details)
          _price += +details?.price * +product?.stock;
        });
      dispatch(handletotalPrice(_price));
      setTotalPrice(_price);
    };
    handlePriceCalculate();
  }, [products, dispatch]);

  const handleRemoveCard = (id) => {
    dispatch(clearError());
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (_productId) => {
    const current = products.find(
      (product) => product.product._id === _productId
    );
    if (current) {
      if (current.quantity < 10) {
        const newQuantity = current.quantity + 1;
        dispatch(
          updateQuantityApi({ productId: _productId, quantity: newQuantity })
        );
      }
    }
  };
  const handleDecrement = (_productId) => {
    const current = products.find(
      (product) => product.product._id === _productId
    );
    if (current) {
      if (current.quantity > 1) {
        const newQuantity = current.quantity - 1;
        dispatch(
          updateQuantityApi({ productId: _productId, quantity: newQuantity })
        );
      } else {
        return;
      }
    }
  };
  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCardOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {products &&
                              products.length &&
                              products?.map((product) => {
                                const details = product.product;
                                
                                const tPrice =
                                product?.price * product.stock;
                                return (
                                  <li key={details?._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={details?.productImages[0]}
                                        alt={details?._id}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <Link to={""}  >
                                              {details?.title}
                                            </Link>
                                          </h3>
                                          <p className="ml-4">
                                             {`₹ ${tPrice}`}
                                          </p>
                                         
                                        </div>
                                        <div className="flex justify-between">
                                          <p className="mt-1 text-sm text-gray-500">
                                            {details?.description}
                                          </p>
                                        
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="mt-2 ms-8 text-gray-900  flex justify-around w-16 shadow-md">
                                          <span className="text-l my-auto cursor-pointer ">
                                            <TiMinus
                                              onClick={() =>
                                                handleDecrement(details?._id)
                                              }
                                            />
                                          </span>
                                          <span className="text-xl text-indigo-600 font-medium my-auto  ">
                                            {product.quantity}
                                          </span>
                                          <span className="text-l my-auto cursor-pointer ">
                                            <FaPlus
                                              onClick={() =>
                                                handleIncrement(details?._id)
                                              }
                                            />
                                          </span>
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() =>
                                              handleRemoveCard(details?._id)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹ {totalPrice}</p>
                      </div>
                    
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/address"
                          onClick={() => handleCardOpen()}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleCardOpen()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
