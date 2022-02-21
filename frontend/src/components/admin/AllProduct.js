import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAdminProducts, deletProduct } from "../../redux/actions/productAction";
import { clearErrors } from "../../redux/actions/productAction";
import Sidebar from "./Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {DELETE_PRODUCT_RESET} from "../../redux/constants/productConstant"

const AllProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, products, error } = useSelector((state) => state.products);
  const {error: deleteError, isDeleted} = useSelector(state=> state.updateDelete);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors);
    }

    if(isDeleted){
      alert.success("Product deleted successfully");
      navigate("/admin/product/all", {replace: true});
      dispatch({type: DELETE_PRODUCT_RESET});
      
    }
  }, [alert, error, dispatch, deleteError, isDeleted, navigate]);

  const deleteHandler = (id) => {
    dispatch(deletProduct(id));
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-dark pt-3">
            <Sidebar />
          </div>
          <div className="col-10 py-5">
            <h4 className="fw-normal">All Products</h4>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover table-sm table-bordered">
                  <thead>
                    <tr className="align-middle table-secondary">
                      <th>Id</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product) => (
                        <tr key={product._id} className="align-middle">
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <Link
                              to={`/admin/product/${product._id}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              <FaEdit />
                            </Link>
                            <button onClick={()=>deleteHandler(product._id)} className="btn btn-danger btn-sm">
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
