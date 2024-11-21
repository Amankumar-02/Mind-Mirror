import { useState, useEffect } from "react";
import appwriteService from "../appwrite/database";
import {
  Container,
  Loader,
  PostCard,
  BasicAuth,
  GoogleAuth,
  AnonymousAuth,
} from "../components/index";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function MyPosts() {
  const [allPost, setAllPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setAllPost(
            posts.documents.filter((item) => item?.userId === userData?.$id)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);

  if (allPost === null) {
    return <Loader />;
  }

  return (
    <div className="w-full my-16">
      <Toaster />
      <Container>
        {userData?.emailVerification ? (
          <>
            <GoogleAuth userData={userData} />
          </>
        ) : (
          <>
            {userData?.passwordUpdate === "" ? (
              <>
                <AnonymousAuth userData={userData} />
              </>
            ) : (
              <>
                <BasicAuth userData={userData} />
              </>
            )}
          </>
        )}
        <div className="flex flex-wrap justify-center items-center w-full md:gap-32 gap-8">
          {allPost.length > 0 ? (
            allPost.map((post) => (
              <div
                key={post.$id}
                className="w-[300px] flex  justify-center items-center "
              >
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h1 className="h-[70vh]">No new post added yet.</h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
