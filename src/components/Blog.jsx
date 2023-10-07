// Blog.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from '../services/services';
import { SkeletonBlog } from './Skeleton';
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import ExpandingButton from "./Expand";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const removeResizeListener = handleResize(setNumCols);

    return () => {

      removeResizeListener();
    };
  }, []);

  useEffect(() => {
    setLoading(true)
    const fetchPosts = async () => {
      try {
        const advisePostsData = await fetchBlogPosts('Advise');
        setAdvisePosts(advisePostsData);
      } finally {

        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  const displayedPosts = showAll ? advisePosts : advisePosts.slice(0, expanded ? advisePosts.length : numCols);
  
  return (
    <>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
        <Typography className="text-2xl font-bold">Tavsiyeler</Typography>

          <a href="/tavsiyeler">
            <Button className="h-10 shadow-xl capitalize">Tüm Tavsiyeler</Button>
          </a>
  
      </div>

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
                        className="w-full h-52 object-cover rounded-t-lg select-none hover:brightness-110 transition-all duration-500"
                        src={image}
                        effect="blur"
                      />
                        </Link>

                      <CardHeader className="bg-transparent h-9 mt-4 shadow-none">
                        <div className="text-xl text-gray-500 font-bold text-center">{post.title}</div>
                      </CardHeader>
                      <CardBody>
                        <Typography className="text-justify leading-normal -mt-6">{text.substring(0, 100)}...</Typography>
                        <div className="font-regular text-center text-l">{post.formattedDate}</div>
                      </CardBody>
                      <CardFooter className="text-center -mt-8">
                      <Link to={`/tavsiyeler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>
                          <Button className="bg-gray-500 shadow-xl capitalize">Devamını Oku</Button>
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
    </>
  );
}  