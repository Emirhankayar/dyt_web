// Blog.jsx
import { useEffect, useState } from "react";
import { fetchBlogPosts } from '../services/services';
import { SkeletonBlog } from './Skeleton';
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import ExpandingButton from "./Expand";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { setupIntersectionObserver, fetchIntersectionObserver } from '../utils/utils'; // Import the utility function
import './Animations.css'

import {  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


export default function CardDefault() {
  const [advisePosts, setAdvisePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numCols, setNumCols] = useState(getNumCols());
  const { showAll, expanded, toggleShowAll } = useToggleShowAll(false);


  setupIntersectionObserver('.hidden-class', 'show');
  setupIntersectionObserver('.hidden-class-up', 'show-up');

  useEffect(() => {
    const removeResizeListener = handleResize(setNumCols);

    return () => {

      removeResizeListener();
    };
  }, []);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const { inViewport, cardRef } = fetchIntersectionObserver(options);

  

  useEffect(() => {
    if (inViewport) {
      setLoading(true);
      const fetchPosts = async () => {
        try {
          const advisePostsData = await fetchBlogPosts("Advise");
  
          // Limit the number of posts to a maximum of 6
          const maxPosts = 6;
          setAdvisePosts(advisePostsData.slice(0, maxPosts));
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }
  }, [inViewport]);
  


  const displayedPosts = showAll ? advisePosts : advisePosts.slice(0, expanded ? advisePosts.length : numCols);
  
  return (
    <>
    <div className="hidden-class">

      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
        <Typography variant="h4" >Tavsiyeler</Typography>

          <a href="/tavsiyeler">
            <Button variant="gradient" color="light-blue" className="h-10 shadow-xl capitalize font-light transition-all duration-300">Tüm Tavsiyeler</Button>
          </a>
  
      </div>
    </div>

          <div className="hidden-class-up" ref={cardRef}>
      <div className="container mx-auto h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
            Array.from({ length: numCols }).map((_, index) => (
              <SkeletonBlog key={index} />
            ))
          ) : (
            displayedPosts.map((post, index) => {
              const { image, text } = extractImageAndDate(post.content);
              return (

                <Card key={index} className="bg-transparent p-4 h-full shadow-none">
                  <div className="h-full max-w-sm rounded-xl mx-auto shadow-xl">
                    <div className="block w-76 items-center ">
                    <Link to={`/tavsiyeler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>

                      <CardHeader className="bg-transparent rounded-lg shadow-xl grid grid-cols-1 place-content-center">

                      <LazyLoadImage
                        decoding="async"
                        fetchpriority="high"
                        useIntersectionObserver={true}
                        alt="card-image"
                        className="w-screen h-[25vh] object-cover object-center rounded-lg select-none hover:brightness-110 transition-all duration-500"
                        src={image}
                        effect="blur"
                      />
                      </CardHeader>
                        </Link>
                      <CardBody className="space-y-2">
                        <Typography variant='h5' className=" text-left">{post.title}</Typography>
                        <Typography variant='paragraph' className="text-justify">{text.substring(0, 130)}...</Typography>
                        <Typography variant='h6' className="text-left">{post.formattedDate}</Typography>
                      </CardBody>
                      <CardFooter className="-mt-6">
                      <Link to={`/tavsiyeler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>
                          <Button variant="outlined" color="light-blue" className="capitalize font-light h-5 flex flex-row justify-center items-center ">Devamını Oku</Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
        {!loading && (
          <ExpandingButton expanded={expanded} onClick={toggleShowAll} />
          )}
          </div>
          </div>
          </>
  );
}  