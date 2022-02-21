import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../layouts/Breadcrumb";

const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);

  const itemPrice = cartItems.reduce((acc, item)=> acc + (item.quantity * item.price), 0);
  const shippingPrice = itemPrice > 499 ? 0 : 40;
  const taxPrice = Number((0.18 * itemPrice).toFixed(2));
  const totalPrice = (itemPrice + shippingPrice + taxPrice).toFixed(2);

  const paymentProcess = () => {
      const data = {
          itemPrice: itemPrice.toFixed(2),
          shippingPrice,
          taxPrice,
          totalPrice
      };
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
      window.location.href = "/payment";
  }

  return (
    <div className="container py-5">
      <Breadcrumb confirmOrder />
      <div className="row">
        <div className="col-8">
          <h4 className="fw-normal mt-4">ShippingInfo</h4>
          <div className="ms-4 mt-3">
            <p>
              <b>Name: </b> <span>{user && user.name}</span>
            </p>
            <p>
              <b>Phone: </b> <span>{user && user.phone}</span>
            </p>
            <p>
              <b>Address: </b>{" "}
              <span>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.country}
              </span>
            </p>
          </div>
          <hr />
          <div className="youtCartItems">
            <h4 className="fw-normal mt-3">Your Cart Items:</h4>

            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product}
                  className="row border-top mt-4 mx-1 border-bottom align-items-center py-3"
                >
                  <div className="col-2">
                    <img
                      src={item.image && item.image}
                      alt={item.image && item.image}
                      width="60px"
                    />
                  </div>
                  <div className="col-6">{item.name}</div>
                  <div className="col-4">
                    {item.quantity} X ${item.price} = 
                     <b> ${item.quantity * item.price}</b>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-4 ps-5">
          <div className="card rounded-lg">
            <div className="card-body">
              <h5 className="fw-normal text-center">Order Summery</h5>
              <hr />
              <p className="d-flex justify-content-between">
                <span>Subtotal: </span>
                <b>${itemPrice.toFixed(2)}</b>
              </p>
              <p className="d-flex justify-content-between">
                <span>Est. Total: </span>
                <b>${shippingPrice}</b>
              </p>
              <p className="d-flex justify-content-between">
                <span>Tax: </span>
                <b>${taxPrice}</b>
              </p>
             
              <p className="d-flex justify-content-between">
                <span>Est. Total: </span>
                <b>${totalPrice}</b>
              </p>
              <hr />

              <div className="text-center">
                <button
                  className="btn btn-warning rounded-pill btn-sm px-4"
                    onClick={paymentProcess}
                >
                  Procced To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
