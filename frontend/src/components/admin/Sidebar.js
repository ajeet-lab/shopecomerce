import React from "react";
import { Link } from "react-router-dom";
import {FaChartBar, FaProductHunt, FaDeezer, FaPlus,FaUsers, FaBookmark, FaComment} from "react-icons/fa"

const Sidebar = () => {
  return (
    <>
      <div className="sidebar_wrapper" style={{ minHeight: "90vh", height: "auto" }}>
        <nav className="navbar navbar-dark">
          <ul className="list-unstyled">
            <li>
              <Link className="nav-link" to="/admin/dashboard">
               <FaChartBar /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="#!"
                data-bs-toggle="collapse"
                data-bs-target="#productsubmenu"
                aria-expanded="false"
                aria-controls="navbarSupportedContent"
              >
               <FaProductHunt /> Products
              </Link>
              <div lass="collapse navbar-collapse" id="productsubmenu">
                <ul className="list-unstyled ps-3 bg-secondary rounded m-0">
                  <li className="nav-item">
                    <Link className="nav-link pb-0" to="/admin/product/all">
                     <FaDeezer /> All Product
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/admin/product/new">
                     <FaPlus /> Create Product
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link className="nav-link" to="/admin/orders">
               <FaBookmark /> Orders
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/admin/users">
               <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/admin/reviews">
               <FaComment /> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
