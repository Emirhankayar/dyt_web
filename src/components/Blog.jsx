// Blog.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from '../services/services';
import { SkeletonBlog } from './Skeleton';
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import ExpandingButton from "./Expand";

import {  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CardDefault() {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when content is loaded
    }, 1500); // Adjust the delay time as needed
  }, []);

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
        <Typography className="text-2xl font-bold">En Yeni Bloglar</Typography>

          <a href="/bloglar">
            <Button className="h-10 shadow-xl capitalize">Tüm Bloglar</Button>
          </a>

      </div>

      <div className="container mx-auto h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
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
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <img
                        srcSet={`${image}?width=100 100w, ${image}?width=200 200w, ${image}?width=300 300w`}
                        sizes="(max-width: 300px) 50vw, 25vw"
                        decoding="async"
                        fetchpriority="high"
                        alt="card-image"
                        loading="lazy"
                        className="w-full h-52 object-cover rounded-t-lg select-none hover:brightness-110 transition-all duration-500"
                        src={image}
                      />
                      </a>
                      <CardHeader className="bg-transparent h-9 mt-4 shadow-none">
                        <div className="text-xl text-gray-500 font-bold text-center">{post.title}</div>
                      </CardHeader>
                      <CardBody>
                        <Typography className="text-justify leading-normal -mt-6">{text.substring(0, 100)}...</Typography>
                        <div className="font-regular text-center text-l">{post.formattedDate}</div>
                      </CardBody>
                      <CardFooter className="text-center -mt-8">
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gray-500 shadow-xl capitalize">Devamını Oku</Button>
                        </a>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
        {!isLoading && (
          <ExpandingButton expanded={expanded} onClick={toggleShowAll} />
        )}
      </div>
    </>
  );
}  