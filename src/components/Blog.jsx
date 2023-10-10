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
          setAdvisePosts(advisePostsData);
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
            <Button className="h-10 shadow-xl capitalize">Tüm Tavsiyeler</Button>
          </a>
  
      </div>
    </div>

          <div className="hidden-class-up" ref={cardRef}>
      <div className="container mx-auto h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                      <LazyLoadImage
                        decoding="async"
                        fetchpriority="high"
                        useIntersectionObserver={true}
                        alt="card-image"
                        className="w-screen h-[30vh] object-cover rounded-t-lg select-none hover:brightness-110 transition-all duration-500"
                        src={image}
                        effect="blur"
                      />
                        </Link>

                      <CardHeader className="bg-transparent h-9 mt-4 shadow-none">
                        <Typography variant='h5' className=" text-center">{post.title}</Typography>
                      </CardHeader>
                      <CardBody>
                        <Typography variant='paragraph' className="text-justify -mt-6">{text.substring(0, 100)}...</Typography>
                        <Typography variant='small' className="text-center mt-2">{post.formattedDate}</Typography>
                      </CardBody>
                      <CardFooter className="text-center -mt-8">
                      <Link to={`/tavsiyeler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>
                          <Button className="capitalize shadow-xl">Devamını Oku</Button>
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