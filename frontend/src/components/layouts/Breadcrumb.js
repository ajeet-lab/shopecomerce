import React from "react";

const Breadcrumb = ({ shippingInfo, confirmOrder, payment }) => {
  return (
    <>
      {shippingInfo ? (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <span className="bg-warning px-2">Shipping</span>
            </li>
            <li className="breadcrumb-item">Confirm Order</li>
            <li className="breadcrumb-item">Payment</li>
          </ol>
        </nav>
      ) : (
        ""
      )}

      {confirmOrder ? (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"> <span className="bg-warning px-2">Shipping</span></li>
            <li className="breadcrumb-item">
              <span className="bg-warning px-2">Confirm Order</span>
            </li>
            <li className="breadcrumb-item">Payment</li>
          </ol>
        </nav>
      ) : (
        ""
      )}

      {payment ? (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item px-2"><span className="bg-warning px-2">Shipping</span></li>
            <li className="breadcrumb-item"><span className="bg-warning px-2">Confirm Order</span></li>
            <li className="breadcrumb-item"><span className="bg-warning px-2">Payment</span></li>
          </ol>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Breadcrumb;
