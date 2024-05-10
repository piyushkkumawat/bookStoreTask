import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const useAppDispatch = () => useDispatch();
// We are using useAppSelector place of use useSelector
export const useAppSelector = useSelector;

export default store;
