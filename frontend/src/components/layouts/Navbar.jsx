import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);
  const {cartItems} = useSelector(state=> state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-700 pe-5" to="/">
            Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#shopnavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="shopnavbar">
            <div className="mx-auto d-flex ms-4 align-items-center justify-content-center w-75">
              <Routes>
                <Route path="/*" element={<Search navigate={navigate} />} />
              </Routes>
              {/* <Search /> */}
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-4">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart <sup className="text-warning">{cartItems ? cartItems.length : 0}</sup>
                </Link>
              </li>
              <li className="nav-item ms-3">
                {user ? (
                  <li className="nav-item dropdown d-flex text-light align-items-center">
                    <figure className="mb-0 pb-0" style={{display:"inline-block", width: "30px", height: "30px", borderRadius: "50%"}}>
                      <img
                        src={user.avatar && user.avatar.url}
                        alt={user.avatar && user.avatar.url}
                        style={{objectFit: "cover", width:"100%", height: "100%", borderRadius:"50%"}}
                      />
                    </figure>
                    <Link
                      className="nav-link dropdown-toggle text-light"
                      to="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {
                        user.role === "admin" && <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </li> 
                      }
                      <li>
                        <Link className="dropdown-item" to="/me">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders/me">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  !loading && (
                    <Link
                      className="nav-link text-dark btn btn-warning btn-sm py-1 mt-1 px-3 me-3"
                      to="/login"
                    >
                      Login
                    </Link>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
