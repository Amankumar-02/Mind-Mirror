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
  const [newValue, setNewValue] = useState(userData?.name || "Anonymous User");

  const updateAccountDetails = async (data) => {
    setError("");
    if (userData?.name === newValue) {
      return setError("Name not edited");
    }
    try {
      const updateResult = await authService.updateUserName(data);
      if (updateResult) {
        const currentUserData = await authService.getCurrentUser();
        toast.success(`Name Changed Successfully`);
        if (currentUserData) {
          dispatch(authLogin(currentUserData));
        }
        setEditToggle((prev=>({...prev, t2:false})));
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
          placeholder="New Name"
          type="text"
          label="Edit Name Here:"
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
          {...register("newName", {
            required: true,
            onChange: (e) => {
              setNewValue(e.target.value);
            },
          })}
        ></Input>
        </div>
          <Button type="submit" text="Save" className="w-fit" style={{"margin-top": "0"}} disabled={userData?.name === newValue? true : false}/>
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
