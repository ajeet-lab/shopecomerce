import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  const productData = {
    product: data.product._id,
    name: data.product.name,
    image: data.product.images[0].url,
    price: data.product.price,
    stock: data.product.stock,
    quantity,
  };

  dispatch({ type: ADD_TO_CART, payload: productData });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
