import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../features/auth/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
// react icons
import { FaMastodon } from "react-icons/fa";
import toast , {Toaster} from "react-hot-toast";

function Login (){
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.createLogin(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        toast.success(`Hey ${userData.name}`);
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    //   console.log(error);
    }
  };

  return (
    <div className="relative flex px-4 flex-col justify-center items-center  h-screen overflow-hidden">
      <Toaster/>
      <div className="w-full p-6 m-auto bg-primary rounded-md border border-gray-400 grid place-content-center shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-secondary flex justify-center gap-1 items-center">
          <FaMastodon /> Mega Blog
        </h1>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
        </h2>
        <p className=" text-base text-center mt-2 ">
          {" "}
          Don&apos; t have an account ?
          <Link
            to="/signup"
            className="font-medium  text-secondary , transition-all duration-200 hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit(login)}>
          <Input
            placeholder="Email Address"
            type="email"
            label="Email :"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                    "Please enter a valid email address";
                },
              },
            })}
          ></Input>

          <Input
            type="password"
            placeholder="Enter Password"
            label="Password :"
            {...register("password", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                    value
                  ) || "Please enter a Strong Password";
                },
              },
            })}
          ></Input>

          <div>
            <Button type="submit" text="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
