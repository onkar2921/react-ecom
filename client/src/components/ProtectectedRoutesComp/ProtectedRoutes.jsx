import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      let token = localStorage.getItem("token");
      // console.log("Token:", token);

      if (!token) {
        // console.log("Navigating to /login...");
        await navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  return <>{children}</>;
}
