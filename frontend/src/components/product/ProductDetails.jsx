import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import {addItemToCart} from '../../redux/actions/cartAction'
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(productDetails(id));
    if (error) {
      alert.error(error);
    }
  }, [dispatch, id, alert, error]);

  const increaseQty = (e) => {
    let count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock)
      return alert.error("Only 5 stock available");
    let qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = (e) => {
    let count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    let qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCartHandler = (id, quantity) => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added");
  }

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="container py-5">
            <div className="row">
              <div className="col-5 d-flex align-items-center">
                <figure>
                  <img
                    src={product.images && product.images[0].url}
                    alt={product.images && product.images[0].url}
                    className="img-fluid"
                  />
                </figure>
              </div>
              <div className="col-7 px-5">
                <h3>{product.name}</h3>
                <p>product : #{product._id}</p>
                <hr />
                <p>
                  <span>*****</span>
                  <span className="ms-2 text-muted">
                    ({product.numOfReviews} Reviews)
                  </span>
                </p>
                <hr />
                <h5 className="mb-3">${product.price}</h5>
                <div className="">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="qty"
                    className="btn btn-white btn-sm px-0 text-center mx-2 count"
                    style={{
                      display: "inline-block",
                      width: "fit-content",
                      border: "none",
                      outline: "none",
                    }}
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={increaseQty}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    className="btn btn-warning btn-sm ms-3 rounded-pill px-4"
                    onClick={()=> addToCartHandler(product._id, quantity)}
                  >
                    Add To Cart
                  </button>
                </div>
                <hr />

                <p>
                  Status:
                  <b
                    className={`${
                      product.stock > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {product.stock > 0 ? " In Stock" : " Out of Stock"}
                  </b>
                </p>

                <hr />
                <div className="description">
                  <h4 className="fw-normal">Descrition:</h4>
                  <p>{product.description}</p>
                </div>
                <hr />

                <p>
                  Sold by: <b>Amazon</b>
                </p>

                <div className="reviewsModal">
                  {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btn-warning px-5 mt-3 rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#submitReviewsModal"
                >
                  Submit Review
                </button>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="submitReviewsModal"
                  tabIndex="-1"
                  aria-labelledby="submitReviewsModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h6 className="modal-title py-0" id="submitReviewsModalLabel">
                          Reviews
                        </h6>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>*****</p>
                        <form >
                          <div className="form-group">
                            <textarea name="review" id="" className="form-control"  rows="3"></textarea>
                          </div>

                          <button type="button" className="btn btn-warning rounded-pill mt-3 px-3">
                          Submit Review
                        </button>
                        </form>
                      </div>
                      {/* <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                </div>




              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
