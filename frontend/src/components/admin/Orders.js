import Sidebar from "./Sidebar";
const Orders = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-dark pt-3">
            <Sidebar />
          </div>
          <div className="col-10 pt-3">Orders</div>
        </div>
      </div>
    </>
  );
};

export default Orders;
