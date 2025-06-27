import React from "react";
import appwriteService from "../../appwrite/database";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, author, $createdAt  }) => {
  // Check if featuredImage is valid before calling getFilePreview
  const getDate = (createdDate) =>{
    const date = new Date(createdDate);

    // Format the date into a user-friendly string
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Display in 12-hour format (AM/PM)
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  return (
    <Link to={`/post/${$id}`} className="px-2 w-auto flex justify-center">
      <div
        className="card w-[300px] md:w-[350px] h-[400px] lg:h-[380px] bg-base-100 shadow-xl rounded-xl border  border-gray-400 capitalize text-center"
      >
        <figure>
          {/* Render the image only if filePreview is available */}
          <img
            className="h-[240px] sm:h-[200px] p-2"
            // src={appwriteService?.getFilePreview(featuredImage)}
            src={`https://fra.cloud.appwrite.io/v1/storage/buckets/6536a1849852da85afde/files/${featuredImage}/view?project=65369fb166261b723ff3&mode=admin`}
            alt={title}
          />
        </figure>
        <div className="card-body gap-0 p-[1rem] lg:p-[2rem]">
          <h2 className="text-lg font-bold"> Title: {title}</h2>
          <p className="text-base "> author : {author}</p>
          <p className="text-xs sm:hidden   "> Created at  : {getDate($createdAt)}</p>

          <div className=" justify-end animate-pulse">Read more</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
