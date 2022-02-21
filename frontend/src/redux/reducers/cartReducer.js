import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isExitsItem = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isExitsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExitsItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
