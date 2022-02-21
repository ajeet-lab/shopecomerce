import React from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
const Product = ({ product, col }) => {
  return (
    <>
      <div
        key={product._id}
        className={`col-lg-${col} col-md-4 col-sm-6 col-12`}
      >
        <div className="card h-100">
          <img
            src={product.images && product.images[0].url}
            alt="product"
            className="card-img-top"
          />
          <div className="card-body">
            <h5>
              <Link to={`/product/${product._id}`} className="nav-link p-0">
                {product.name}
              </Link>
            </h5>
            <div className="starts d-flex ">
              <span className="text-warning">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
              </span>
              <span className="ms-2 text-muted" style={{ marginTop: "2px" }}>
                {" "}
                (5 Ratings)
              </span>
            </div>
            <div className="price my-3">
              <h5 className="fw-500">${product.price}</h5>
            </div>
            <div className="text-center">
              <Link
                to={`/product/${product._id}`}
                className="btn btn-warning btn-sm w-100 shadow-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
