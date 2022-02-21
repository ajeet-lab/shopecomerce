import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import { loadUser } from "./redux/actions/userAction";
import ProtectedRoute from "./components/route/ProtectedRoute";
import store from "./store";
import Cart from "./components/cart/Cart";
import ShippingInfo from "./components/cart/ShippingInfo";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/cart/Success";
import ListOrder from "./components/order/ListOrder";
import Dashboard from "./components/admin/Dashboard";
import AllProduct from "./components/admin/AllProduct";
import NewProduct from "./components/admin/NewProduct";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import Reviews from "./components/admin/Reviews";
import UpdateProduct from "./components/admin/UpdateProduct";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingInfo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/confirmorder"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />

          <Route path="/orders/me" element={<ListOrder />} />

          {/* Admin Route */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product/all" element={<AllProduct />} />
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/reviews" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
