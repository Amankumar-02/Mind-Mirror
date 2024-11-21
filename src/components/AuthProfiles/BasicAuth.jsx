import React, { useState } from "react";
import { Button, EditName, EditEmail, EditPassword } from "../index";
import { CiEdit } from "react-icons/ci";

function BasicAuth({ userData }) {
  const [editToggle, setEditToggle] = useState({
    t1: false,
    t2: false,
    t3: false,
    t4: false,
  });
  return (
    <div className="w-full p-6 my-[3rem] mx-auto bg-primary rounded-md border border-gray-400 shadow-md lg:max-w-lg">

      <h1 className="text-center text-blue-500 font-bold break-all">
        Name:{" "}
        <span className="text-gray-400 text-lg">
          {userData?.name || "Anonymous User"}
        </span>
        {editToggle.t1 ? (
          <>
            <span
              className={`inline-block ml-4 text-lg cursor-pointer ${editToggle.t2 ? "opacity-[0.6] text-gray-400" : null}`}
              onClick={() => {
                setEditToggle((prev) => ({
                  ...prev,
                  t2: true,
                  t3: false,
                  t4: false,
                }));
              }}
            >
              <CiEdit />
            </span>
          </>
        ) : null}
      </h1>

      <p className="text-center text-blue-500 font-bold break-all">
        Email:{" "}
        <span className="text-gray-400 text-lg">
          {userData?.email || "anonymous@gmail.com"}
        </span>
        {editToggle.t1 ? (
          <>
            <span
             className={`inline-block ml-4 text-lg cursor-pointer ${editToggle.t3 ? "opacity-[0.6] text-gray-400" : null}`}
              onClick={() => {
                setEditToggle((prev) => ({
                  ...prev,
                  t3: true,
                  t2: false,
                  t4: false,
                }));
              }}
            >
              <CiEdit />
            </span>
          </>
        ) : null}
      </p>

      {editToggle.t1 ? (
        <>
          <p className="text-center text-blue-500 font-bold break-all">
            Change Password
            <span
              className={`inline-block ml-4 text-lg cursor-pointer ${editToggle.t4 ? "opacity-[0.6] text-gray-400" : null}`}
              onClick={() => {
                setEditToggle((prev) => ({
                  ...prev,
                  t4: true,
                  t2: false,
                  t3: false,
                }));
              }}
            >
              <CiEdit />
            </span>
          </p>
        </>
      ) : null}

      {!editToggle.t1 ? (
        <>
          <div className="flex items-center justify-center">
            <Button
              text={"Edit Details"}
              className="mt-6 w-fit"
              onClick={() => {
                setEditToggle((prev) => ({ ...prev, t1: true }));
              }}
            />
          </div>
        </>
      ) : (
        <>
          {editToggle.t2 ? (
            <EditName
              userData={userData}
              setEditToggle={setEditToggle}
              marginStyle="my-8"
            />
          ) : null}
          {editToggle.t3 ? (
            <EditEmail
              userData={userData}
              setEditToggle={setEditToggle}
              marginStyle="my-8"
            />
          ) : null}
          {editToggle.t4 ? (
            <EditPassword
              userData={userData}
              setEditToggle={setEditToggle}
              marginStyle="my-8"
            />
          ) : null}
          <div className="mt-6 flex items-center justify-center">
            <Button
              text="Cancel"
              onClick={() => {
                setEditToggle((prev) => ({
                  ...prev,
                  t1: false,
                  t2: false,
                  t3: false,
                  t4: false,
                }));
              }}
              className="w-fit hover:bg-red-500 hover:border-red-500"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default BasicAuth;
