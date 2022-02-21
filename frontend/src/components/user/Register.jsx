import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../redux/actions/userAction";
const Register = () => {
    const navigate = useNavigate();
    const alert = useAlert();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { name, email, phone, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/logo192.png");

  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/", { require: true });
      }

      if (error) {
        alert.error(error);
        dispatch(clearErrors())
      }
    }, [dispatch, error, alert, isAuthenticated, navigate]);

  const changeHandler = (e) => {
    //
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
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
                  <h1 className="card-title text-center mb-4">Register User</h1>
                  <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        className="form-control"
                        onChange={changeHandler}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="form-control"
                        onChange={changeHandler}
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        value={phone}
                        className="form-control"
                        onChange={changeHandler}
                        placeholder="Enter Phone"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="form-control"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="form-group">
                      <div className="d-flex align-items-center">
                        <figure
                          className="mt-3 me-2 d-flex align-items-center"
                          style={{
                            width: "55px",
                            height: "50px",
                            objectFit: "cover",
                            backgroundColor: "lightgray",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={avatarPreview}
                            className=""
                            alt={avatarPreview}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </figure>
                        <input
                          type="file"
                          name="avatar"
                          className="form-control"
                          onChange={changeHandler}
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div>
                      <Link to="/login" className="nav-link text-end">
                        Login
                      </Link>
                    </div>

                    <div className="form-group">
                      <button className="btn btn-warning w-100">Register</button>
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

export default Register;
