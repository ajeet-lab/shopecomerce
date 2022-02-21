import axios from "axios";
import {
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

export const newOrder = (orders) => async (dispatch) => {
  dispatch({ type: NEW_ORDER_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", orders, config);
    dispatch({ type: NEW_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDER_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/orders/me");
    console.log("all orders", data);
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
  }
};

// CLEAR ERRORS ACTION
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
