import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import Product from "./product/Product";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [price, setPrice] = useState([1, 100000]);
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    products,
    error,
    loading,
    productsCount,
    resPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  console.log("products home", products);

  const categories = [
    "Electronics",
    "Laptops",
    "Cameras",
    "Accesseries",
    "Headphones",
    "Beauty/Healthy",
    "Sport",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, keyword, currentPage, price, category]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductCount;
  }
  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <MetaData title="Buy Best Products Online" />
          <div className="container py-3">
            <h2 className="mb-4 fw-normal">Latest Products</h2>

            <div className="row g-3 mt-4">
              {keyword ? (
                <>
                  <div className="col-lg-2 col-md-4 px-4">
                    <Range
                      marks={{
                        1: "$1",
                        100000: "$100000",
                      }}
                      min={1}
                      max={100000}
                      defaultValue={[1, 100000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: "top",
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />

                    <div className="my-5">
                      <hr />
                      <h4>Category</h4>
                      <ul className="list-unstyled">
                        {categories &&
                          categories.map((cate) => (
                            <li
                              className="pointer"
                              key={cate}
                              onClick={() => setCategory(cate)}
                            >
                              {cate}
                            </li>
                          ))}
                      </ul>
                      <hr />
                    </div>

                  </div>
                  <div className="col-lg-10 col-md-8">
                    <div className="row g-3">
                      {products &&
                        products.map((product) => {
                          return (
                            <Product
                              key={product._id}
                              product={product}
                              col={4}
                            />
                          );
                        })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {products &&
                    products.map((product) => {
                      return (
                        <Product key={product._id} product={product} col={3} />
                      );
                    })}
                </>
              )}
            </div>
            {resPerPage <= count && (
              <>
                <div className="mt-4 d-flex justify-content-center">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass={"page-item"}
                    linkClass={"page-link"}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
