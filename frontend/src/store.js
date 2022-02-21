import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./redux/reducers/cartReducer";
import { myOrdersReducer, orderReducer } from "./redux/reducers/orderReducer";

import {
  productsReducer,
  productReducer,
  newProductReducer,
  updateAndDeleteReducer,
} from "./redux/reducers/productReducer";
import { authReducer } from "./redux/reducers/userReducer";

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  updateDelete: updateAndDeleteReducer,
  newProduct: newProductReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
