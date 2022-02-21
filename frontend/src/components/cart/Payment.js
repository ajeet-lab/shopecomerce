import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../layouts/Breadcrumb";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import axios from "axios";
import { newOrder } from "../../redux/actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const orders = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo && orderInfo.itemPrice,
    taxPrice: orderInfo && orderInfo.taxPrice,
    shippingPrice: orderInfo && orderInfo.shippingPrice,
    totalPrice: orderInfo && orderInfo.totalPrice,
  };

  useEffect(() => {}, []);

  const paymentHandler = async (e) => {
    e.preventDefault();

    // Select Payment button and Disabled after submited data
    document.querySelector("#pay_btn").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      res = await axios.post("/api/v1/payment/process", paymentData, config);
      const clientSecret = res.data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user && user.name,
            email: user && user.email,
          },
        },
      });
      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // PLACE TO ORDERS
          orders.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(newOrder(orders));
          localStorage.removeItem("cartItems");
          sessionStorage.removeItem("orderInfo");
          window.location.href = '/success';
        } else {
          document.querySelector("#pay_btn").disabled = false;
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container py-5">
        <Breadcrumb payment />
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6 col-12 offset-lg-4 offset-md-3">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title fw-normal text-center mb-3">
                  Payment Info
                </h3>
                <form onSubmit={paymentHandler}>
                  <div className="form-group mb-3">
                    <label htmlFor="cardnumber">
                      <b>Card Number</b>
                    </label>
                    <CardNumberElement
                      type="text"
                      name="cardnumber"
                      id="cardnumber"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="expirydate">
                      <b>Expiry Date</b>
                    </label>
                    <CardExpiryElement
                      type="text"
                      name="expirydate"
                      id="expirydate"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="cvv">
                      <b>Expiry Date</b>
                    </label>
                    <CardCvcElement
                      type="text"
                      name="cvv"
                      id="cvv"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <button
                      id="pay_btn"
                      className="btn btn-warning px-4 btn-sm w-100"
                    >
                      Pay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
