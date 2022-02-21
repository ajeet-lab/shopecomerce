import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myOrders, clearErrors } from "../../redux/actions/orderAction";

const ListOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <>
      <div className="container py-5">
        <h3 className="fw-normal">Orders</h3>
        <div className="table-responsive">
          <table className="table text-center table-striped table-bordered table-hover">
            <thead>
              <tr className="table-secondary align-middle">
                <th>
                  Product ID
                </th>
                <th>Num Of Item</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                orders &&
                orders.map((order) => (
                  <tr className="align-middle">
                    <td>{order._id}</td>
                    <th>{order.orderItems.length}</th>
                    <td>{order.totalPrice}</td>
                    <th>{order.orderStatus && String(order.orderStatus).includes("Delivered") ? <span className="text-success">{order.orderStatus}</span>: <span className="text-danger">{order.orderStatus}</span>}</th> 
                    <td>
                        <Link to={`/order/${order._id}`} className="nav-link">
                            View
                        </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListOrder;
