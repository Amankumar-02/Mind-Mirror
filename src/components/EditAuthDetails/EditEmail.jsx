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
  const [newValue, setNewValue] = useState(userData?.email);
  const [newValue2, setNewValue2] = useState("");

  const updateAccountDetails = async (data) => {
    setError("");
    if (userData?.name === newValue) {
      return setError("Email not edited");
    }
    try {
      const updateResult = await authService.updateUserEmail(data);
      if (updateResult) {
        const currentUserData = await authService.getCurrentUser();
        toast.success(`Email Changed Successfully`);
        if (currentUserData) {
          dispatch(authLogin(currentUserData));
        }
        setEditToggle((prev=>({...prev, t3:false})));
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
        <Input
          placeholder="New Email"
          type="email"
          label="Edit Email Here:"
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
          {...register("newEmail", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                  "Please enter a valid email address";
              },
            },
            onChange: (e) => {
              setNewValue(e.target.value);
            },
          })}
          className="mb-2 lg:mb-2"
        ></Input>
        <Input
          placeholder="Email Confirm Password"
          type="password"
        //   label="Edit Email Here:"
          value={newValue2}
          onChange={(e) => {
            setNewValue2(e.target.value);
          }}
          {...register("emailConfirmPassword", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                  value
                ) || "Please enter a Strong Password";
              },
            },
            onChange: (e) => {
              setNewValue2(e.target.value);
            },
          })}
        ></Input>
        </div>
          <Button type="submit" text="Save" className="w-fit" style={{"margin-top": "0"}} disabled={newValue2.length < 8 ? true : false}/>
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
