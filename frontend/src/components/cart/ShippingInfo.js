import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import Breadcrumb from "../layouts/Breadcrumb";

const ShippingInfo = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/confirmorder", {replace: true})
  };
  return (
    <>
      <div className="container py-5">
        <Breadcrumb shippingInfo />
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 offset-lg-4 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="phone"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="postalcode">Postal Code</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="postalcode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-warning btn-sm w-100">
                      Shipping
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
