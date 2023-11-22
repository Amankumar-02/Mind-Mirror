import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/auth/authSlice";
import {Button} from "../index";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("Log Out");
    try {
      await authService.createLogout();
      toast.success("Logout successful");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Toaster />
      <Button text="Log out" onClick={handleClick} />
    </>
  );
};

export default LogoutBtn;
