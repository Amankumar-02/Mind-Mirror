import React, { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import {Header,Footer,} from "./components/index";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // here auth gives the appwrite status, then we pass the auth to the store 
  //chech status true or false, then dispatch to slice // 3 step work

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          toast.success(`hey ${userData.name}`, 
          // {icon: "🙋‍♂️",}
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        toast.error(`Kindly Login`, 
        // {icon: "🥲",}
        );
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(loading);

  return !loading ? (
    // <div className={`min-h-screen flex flex-wrap content-between bg-[#020816]`}>
    <div className={`min-h-screen flex flex-wrap content-between bg-primary`}>
      {/* <Toaster /> */}
      <Toaster />
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
