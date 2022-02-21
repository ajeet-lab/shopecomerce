import Sidebar from "./Sidebar";

const Users = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row">
          <div
            className="col-2 bg-dark pt-3"
            style={{ minHeight: "90vh", height: "auto" }}
          >
            <Sidebar />
          </div>
          <div className="col-10 pt-3">Users</div>
        </div>
      </div>
    </>
  )
}

export default Users