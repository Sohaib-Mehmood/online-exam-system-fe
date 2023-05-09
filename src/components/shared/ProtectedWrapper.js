import { Outlet, useNavigate } from "react-router-dom";

const ProtectedWrapper = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", {
      replace: true,
      state: { from: window.location.pathname },
    });
    return null;
  }

  return <Outlet />;
};

export default ProtectedWrapper;
