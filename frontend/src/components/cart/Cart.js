import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  removeItemToCart,
} from "../../redux/actions/cartAction";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //   Increase quantity
  const increaseQty = (id, quantity, stock) => {
    let newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty, stock));
  };

  //   Decrease quantity
  const decreaseQty = (id, quantity) => {
    let newQty = quantity - 1;
    if (newQty < 1) return removeToCart(id);
    dispatch(addItemToCart(id, newQty));
  };

  //   Remove Item To Cart
  const removeToCart = (id) => {
    dispatch(removeItemToCart(id));
  };

  const checkOutHandler = () => {
    navigate(`/login?redirect=shipping`, { replace: true });
  };
  return (
    <div className="container py-5">
      {cartItems.length > 0 ? (
        <h4>Your Cart: {cartItems.length} Items</h4>
      ) : (
        <h4>Your Cart is empty</h4>
      )}
      <div className="row">
        <div className="col-8">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.product} className="row border-top border-bottom mb-3 py-2 align-items-center">
                <div className="col-2">
                  <img
                    src={item.image && item.image}
                    alt={item.image && item.image}
                    width="60px"
                  />
                </div>
                <div className="col-4">{item.name}</div>
                <div className="col-1">
                  <b className="text-warning">${item.price}</b>
                </div>
                <div className="col-3 text-center">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="qty"
                      className="btn btn-white btn-sm px-0 text-center mx-1 count"
                      style={{
                        display: "inline-block",
                        width: "50px",
                        border: "none",
                        outline: "none",
                      }}
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-1">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeToCart(item.product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="col-4 ps-5">
          <div className="card rounded-lg">
            <div className="card-body">
              <h5 className="fw-normal text-center">Order Summery</h5>
              <hr />
              <p className="d-flex justify-content-between">
                <span>Subtotal: </span>{" "}
                <b>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  (Unit)
                </b>
              </p>
              <p className="d-flex justify-content-between">
                <span>Est. Total: </span>{" "}
                <b>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </b>
              </p>
              <hr />

              <div className="text-center">
                <button
                  className="btn btn-warning rounded-pill btn-sm px-4"
                  onClick={checkOutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
