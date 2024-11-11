import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostCard from "../Cards/PostCard";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2200 },
    items: 5,
  },
  largeDesktop: {
    breakpoint: { max: 2200, min: 1600 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 800
     },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 1,
  },
};

const PostCarousel = ({posts}) => {
  return (
    <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        arrows={false}
        >
        
        {posts && posts.map((post) => (
          <div
            key={post.$id}
            className="  flex items-center justify-center p-0 mt-16 lg:mt-0 md:mt-0 "
          >
            <PostCard {...post} />
          </div>
        ))}
        
      </Carousel>
  )
}

export default PostCarousel
