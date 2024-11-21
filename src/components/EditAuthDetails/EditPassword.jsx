import React, {useState} from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../features/auth/authSlice";
import { Input, Button } from "../index";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function EditName({ userData, setEditToggle, marginStyle }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateAccountDetails = async (data) => {
    setError("");
    // if (userData?.name === newValue) {
    //   return setError("Password not edited");
    // }
    try {
      const updateResult = await authService.updatePassword(data);
      if (updateResult) {
        const currentUserData = await authService.getCurrentUser();
        toast.success(`Password Changed Successfully`);
        if (currentUserData) {
          dispatch(authLogin(currentUserData));
        }
        setEditToggle((prev=>({...prev, t4:false})));
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
      <form
        className={`space-y-4 flex items-end justify-center gap-4 ${marginStyle}`}
        onSubmit={handleSubmit(updateAccountDetails)}
        >
        <div className="custom w-[80%] lg:w-[60%]">
        {/* <div> */}
        {userData.passwordUpdate === "" ? null : (<>
          <Input
          placeholder="Old Password"
          type="password"
          label="Edit Password Here:"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          {...register("oldPassword", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                  value
                ) || "Please enter a Strong Password";
              },
            },
            onChange: (e) => {
              setOldPassword(e.target.value);
            },
          })}
          className="mb-2 lg:mb-2"
        ></Input>
        </>)}
        <Input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          {...register("newPassword", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                  value
                ) || "Please enter a Strong Password";
              },
            },
            onChange: (e) => {
              setNewPassword(e.target.value);
            },
          })}
          className="mb-2 lg:mb-2"
        ></Input>
        <Input
          placeholder="Confirm Password"
          type="password"
        //   label="Edit User Email Here:"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          {...register("confirmPassword", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                  value
                ) || "Please enter a Strong Password";
              },
            },
            onChange: (e) => {
                setConfirmPassword(e.target.value);
            },
          })}
        ></Input>
        </div>
          <Button type="submit" text="Save" className="w-fit" style={{"margin-top": "0"}} disabled={confirmPassword.length < 8  ? true : false}/>
      </form>
      {/* <div className="mt-2">
        <Button
          text="Cancel"
          onClick={()=>{
            setNewValue(userData?.name);
            setEditToggle(prev=>!prev);
          }}
          className="w-full hover:bg-red-500 hover:border-red-500"
        />
      </div> */}
    </>
  );
}

export default EditName;
