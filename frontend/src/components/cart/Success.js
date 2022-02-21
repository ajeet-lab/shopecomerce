import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-md-6 col-sm-8 col-10 offset-md-3 offset-sm-2 offset-1">
            <figure style={{ width: "100%", height: "200px" }}>
              <img
                src="/images/successful_payment.png"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </figure>
            <div className="text-center">
              <p className="mt-4">Your order has been placed successfully</p>

              <Link className="nav-link" to="/orders/me">
                Go to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
