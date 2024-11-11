import { useState, useEffect } from "react";
import appwriteService from "../appwrite/database";
import { Container, Loader, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function MyPosts() {
  const [allPost, setAllPost] = useState(null);
  // const posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userData);
  // console.log(posts);

  useEffect(() => {
    // if (posts.length > 0) {
    //   setAllPost(posts);
    // } else {
      appwriteService
        .getPosts()
        .then((posts) => {
          if (posts) {
            setAllPost(posts.documents.filter(item=>item?.userId === userData?.$id));
            console.log("service returned");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  }, [userData]);

  if (allPost === null) {
    return <Loader />;
  }

  return (
      <div className="w-full my-16">
      <Container>
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
            <h1 className="h-[70vh]">No post added yet.</h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
