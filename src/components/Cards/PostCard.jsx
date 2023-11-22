import React from "react";
import appwriteService from "../../appwrite/database";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

const PostCard = ({ $id, title, featuredImage, author  }) => {
  // Check if featuredImage is valid before calling getFilePreview
  // const getDate = (createdDate) =>{
  //   const date = new Date(createdDate);

  //   // Format the date into a user-friendly string
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: true, // Display in 12-hour format (AM/PM)
  //   };
  //   const formattedDate = date.toLocaleString("en-US", options);
  //   return formattedDate;
  // }


  return (
    <Link to={`/post/${$id}`} className="px-2">
      <div
        className="card w-auto sm:w-auto md:w-[350px] lg:w-[350px] h-[400px] lg:h-[380px] bg-base-100 shadow-xl rounded-xl border  border-gray-400 capitalize text-center"
      >
        <figure>
          {/* Render the image only if filePreview is available */}
          <img
            className="h-[240px] sm:h-[200px]"
            src={appwriteService?.getFilePreview(featuredImage)}
            alt={title}
          />
        </figure>
        <div className="card-body gap-0 ">
          <h2 className="text-lg font-bold"> Title: {title}</h2>
          <p className="text-base "> author : {author}</p>
          {/* <p className="text-xs sm:hidden   "> Created at  : {getDate($createdAt)}</p> */}

          <div className=" justify-end animate-pulse">Read more</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
