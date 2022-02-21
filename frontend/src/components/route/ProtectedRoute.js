import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : isAuthenticated ? (
        children
      ) : (
        navigate("/login", { replace: true })
      )}
    </>
  );
};

export default ProtectedRoute;
