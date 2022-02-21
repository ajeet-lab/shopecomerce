import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const { loading, user } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <figure className="text-center">
                <img
                  src={user.avatar && user.avatar.url}
                  alt=""
                  className="rounded-circle text-center"
                  width={"150px"}
                  height={"150px"}
                />
              </figure>

              <Link to="editprofile" className="btn btn-warning w-100 mt-4">
                Edit Profile
              </Link>
            </div>
            <div className="col-6 ps-sm-5">
              <h4>Name</h4>
              <p>{user.name}</p>

              <h4>Email</h4>
              <p>{user.email}</p>

              {user.role !== "admin" ? null : (
                <Link to="/dashboard" className="btn btn-primary w-100 mb-3">
                  Dashboard
                </Link>
              )}
              <Link to="/me/update" className="btn btn-danger w-100">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
