import React, { useState, useEffect } from "react";
import Spinner from '../components/Spinner'
import { fetchBlogPosts } from '../services/services'; 
import { extractImageAndDate } from '../utils/utils'; 

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const DUMMY_IMAGE_URL = import.meta.env.VITE_DUMMY_IMG;


export default function CardDefault() {
  const [advisePosts, setAdvisePosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const advisePostsData = await fetchBlogPosts('Advise');
        setAdvisePosts(advisePostsData);
      } finally {
        // Set loading to false when data fetching is complete (even if there's an error)
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />; // Render the loading spinner while data is being fetched
  }



  return (

    <>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
        <Typography className="text-2xl font-bold">En Yeni Bloglar</Typography>
        <a href="https://diyetzamanidostum.blogspot.com/search/label/Advise" target="_blank" rel="noopener noreferrer">
          <Button className="h-10 shadow-xl capitalize">
            Tüm Bloglar
          </Button>
        </a>
      </div>
      <section className="font-jet flex flex-col items-center justify-center">

        <div className="container mx-auto">

          <div className="container flex flex-wrap justify-center lg:w-3/4 w-full mx-auto">
            {advisePosts.map((post, index) => {

            const { image, text } = extractImageAndDate(post.content);

              return (

                <Card key={index} className="bg-transparent p-4 w-max md:w-3/6 lg:w-1/2 shadow-none">

                  <div className="h-full bg-gray-100 max-w-sm w-5/6 md:w-full lg:w-full rounded-xl mx-auto shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">

                        <img
                          src={image ? image : DUMMY_IMAGE_URL}
                          alt="card-image"
                          className="w-full h-52 object-cover rounded-t-lg select-none hover:brightness-110 transition-all duration-500"
                        /></a>

                      <CardHeader className="flex flex-row w-full bg-transparent h-9 items-center mt-4 shadow-none 
                    ">
                        <div className="w-11/12 flex ml-8 text-xl text-blue-500 font-bold">
                          {post.title}
                        </div>
                        <div className="w-1/2 flex justify-end mr-8 font-regular text-l">
                          {post.formattedDate}
                        </div>
                      </CardHeader>
                      <CardBody className="-mt-4">
                        <Typography className="text-justify leading-normal">
                          {text.substring(0, 200)}...
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex items-center justify-center -mt-8">
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-blue-500 shadow-xl capitalize">
                            Daha Fazla
                          </Button>
                        </a>

                      </CardFooter>
                    </div>
                  </div>
                </Card>
              );
            })}

          </div>
        </div>
      </section>
    </>

  );

}