import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../redux/actions/userAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // Find Search Query
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    // Check User Authenticate or Not
    if (isAuthenticated) {
      if (redirect !== "/") {
        navigate(`${"/" + redirect}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }

    // Check Error or Not
    if (error) {
      console.log("error", error.message);
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  // Login Form Handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 pt-5 offset-lg-4 offset-md-3 col-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="card-title text-center mb-4">Login</h1>
                  <form onSubmit={submitHandler}>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <Link to="/register" className="nav-link text-end">
                        Register
                      </Link>
                    </div>

                    <div className="form-group">
                      <button className="btn btn-warning w-100">Login</button>
                    </div>
                  </form>
                  <div>
                    <a href="/forgotpassword" className="nav-link text-end">
                      Forgot Password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
