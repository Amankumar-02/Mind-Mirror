import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "..//appwrite/database";
import { Button, Container, Loader, PostCarousel } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import { PostCarousel } from "../components/index";
import toast, { Toaster } from "react-hot-toast";

export default function Post() {
  const [post, setPost] = useState(null);
  
  const [allposts, setAllPosts] = useState(null);
  const storePosts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (storePosts.length > 0) {
      setAllPosts(storePosts);
    } else {
      appwriteService
        .getPosts()
        .then((posts) => {
          if (posts) {
            setAllPosts(posts.documents);
            console.log("service returned");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const { slug } = useParams();
  let createdDate;
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    try {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
          toast.success("Post deleted successfully");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  if (post) {
    const date = new Date(post?.$createdAt);

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
    createdDate = formattedDate;
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-center mb-4 ">
            {post?.title}
          </h1>
          <span className="text-2xl font-light capitalize text-gray-300 mt-4 ">
            Author: {post?.author}
          </span>
          <br></br>
          <span>Created on: {createdDate}</span>
        </div>
        <div className="w-full flex justify-center mb-4 relative  border-gray-400 border md:border-none rounded-xl p-2 gap-5">
          <div className="relative">
          <img
            src={appwriteService.getFilePreview(post?.featuredImage)}
            alt={post?.title}
            className="rounded-xl lg:h-[70vh] md:border  border-gray-400 md:p-3 "
          />

          {isAuthor && (
            <div className="absolute right-[6px] lg:right-[16px] top-[6px] lg:top-[16px] bg-black opacity-70 p-2 rounded-xl">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3 px-3 lg:px-4 lg:py-1" text="Edit"></Button>
              </Link>
              <Button
                className="hover:bg-red-500 hover:border-red-500 px-3 lg:px-4 lg:py-1"
                onClick={deletePost}
                text="Delete"
              ></Button>
            </div>
          )}
          </div>
        </div>

        <div className=" mt-16  browser-css text-xl lg:text-xl text-center">
          {parse(post?.content)}
        </div>
      </Container>

      {allposts && (
        <div className="mb-16 mt-20 px-4 text-center">
          <h3 className="text-3xl text-secondary font-semibold mb-16">
            Some of our Blogs
          </h3>
          <PostCarousel posts={allposts} />
        </div>
      )}
    </div>
  ) : <Loader/>;
}
