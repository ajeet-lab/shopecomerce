import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
} from "../constants/productConstant";
import axios from "axios";

// GET ALL PRODUCTS WITH FILTER, SEARCH, PAGINATION -- USER
export const getProducts =
  (keyword = "", pageNumber = 1, price, category, ratings = 0) =>
  async (dispatch) => {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    try {
      let url = `/api/v1/products?keyword=${keyword}&page=${pageNumber}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

      if (category) {
        url = `/api/v1/products?keyword=${keyword}&page=${pageNumber}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }

      const { data } = await axios.get(url);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error ? error.response.data.errMessage : error.message,
      });
    }
  };

// PRODUCT DETAIL ACTION
export const productDetails = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error ? error.response.data.message : error.message,
    });
  }
};

// ================ ADMIN =================
// GET ALL PRODUCTS -- ADMIN
export const getAdminProducts = () => async (dispatch) => {
  dispatch({ type: ADMIN_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error ? error.response.data.errMessage : error.message,
    });
  }
};

// ADD NEW PRODUCT
export const newProduct = (productData) => async (dispatch) => {
  dispatch({ type: NEW_PRODUCTS_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );
    dispatch({ type: NEW_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCTS_FAIL, payload: error.response.data.message });
  }
};

// DELETE PRODUCT
export const deletProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    console.log("error", error.message)
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEAR ERRORS ACTION
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
