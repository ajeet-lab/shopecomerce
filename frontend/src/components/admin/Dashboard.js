import Sidebar from "./Sidebar";
import { FaAngleRight } from "react-icons/fa";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert"
import { clearErrors, getAdminProducts } from "../../redux/actions/productAction";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const {loading, error, products} = useSelector(state=> state.products);
  useEffect(()=>{
    dispatch(getAdminProducts());

    if(error){
      alert.error(error);
      dispatch(clearErrors)
    }

  }, [alert, error, dispatch])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-dark pt-3">
            <Sidebar />
          </div>
          <div className="col-10 pt-5">
            <div className="row">
              <div className="col-12 text-center">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h2 className="card-title m-0 fw-normal">
                      Total Amount
                      <br />
                      <span className="fw-bold">$14523</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 my-4">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
                <div className="card bg-warning">
                  <div className="card-body">
                    <h4 className="fw-normal m-0">
                      Products
                      <br />
                      {loading ? "" :products && products.length}
                    </h4>
                  </div>
                  <div className="card-footer py-1">
                  <Link
                      to="/admin/product/all"
                      className="nav-link text-dark d-flex justify-content-between align-items-center"
                    >
                      <span>View Details</span> <FaAngleRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h4 className="fw-normal m-0">
                      Orders
                      <br />
                      225
                    </h4>
                  </div>
                  <div className="card-footer py-1">
                  <Link
                      to="/admin/orders"
                      className="nav-link text-light d-flex justify-content-between align-items-center"
                    >
                      <span>View Details</span> <FaAngleRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
                <div className="card bg-info">
                  <div className="card-body">
                    <h4 className="fw-normal m-0">
                      User
                      <br />
                      100
                    </h4>
                  </div>
                  <div className="card-footer py-1">
                  <Link
                      to="/admin/users"
                      className="nav-link text-dark d-flex justify-content-between align-items-center"
                    >
                      <span>View Details</span> <FaAngleRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
                <div className="card bg-danger text-white">
                  <div className="card-body">
                    <h4 className="fw-normal m-0">
                      Out Of Stock
                      <br />4
                    </h4>
                  </div>
                  <div className="card-footer py-1 px-0">
                    <Link
                      to="/admin/product/all"
                      className="nav-link text-light d-flex justify-content-between align-items-center"
                    >
                      <span>View Details</span> <FaAngleRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
