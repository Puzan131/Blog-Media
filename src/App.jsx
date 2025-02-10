import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import authService from "./appwrite/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  //conditional rendering
  return loading ? null : (
  <div className="flex  flex-wrap min-h-screen bg-fuchsia-300">
    <div className="w-full block ">
        <Header />
         {/*  <Outlet /> */}
        <Footer />
    </div>
  </div>
);
}

export default App;
