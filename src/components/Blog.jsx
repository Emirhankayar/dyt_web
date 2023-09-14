import React, { useState, useEffect, Suspense } from "react";
import he from "he"; // Import the 'he' library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Carousel,
  IconButton,
} from "@material-tailwind/react";

const API_KEY = import.meta.env.VITE_BLOG_KEY;
const BLOG_URL = import.meta.env.VITE_BLOG_URL;
const DUMMY_IMAGE_URL = import.meta.env.VITE_DUMMY_IMG;

const fetchBlogPosts = async (tag) => {
  try {
    const response = await fetch(`${BLOG_URL}?key=${API_KEY}&labels=${tag}&orderBy=published&maxResults=4`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const formattedData = data.items.map((post) => {
      const publishedDate = new Date(post.published);
      const formattedDate = `${String(publishedDate.getDate()).padStart(2, '0')}.${String(publishedDate.getMonth() + 1).padStart(2, '0')}.${publishedDate.getFullYear()}`;
      return {
        ...post,
        formattedDate,
      };
    });
    return formattedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function CardDefault() {
  const [advisePosts, setAdvisePosts] = useState([]);
  const [recipePosts, setRecipePosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const advisePostsData = await fetchBlogPosts('Advise');
        const recipePostsData = await fetchBlogPosts('Recipe');
        setAdvisePosts(advisePostsData);
        setRecipePosts(recipePostsData);
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

  // Function to extract image source and date from HTML content
  const extractImageAndDate = (html) => {
    const text = he.decode(html);
    const imgRegex = /<img.*?src=["'](.*?)["'].*?>/; // Regular expression to match image source
    const dateRegex = /<span[^>]*class=["']published["'][^>]*>(.*?)<\/span>/; // Regular expression to match date
    const imageMatch = imgRegex.exec(html);
    const dateMatch = dateRegex.exec(html);

    return {
      image: imageMatch ? imageMatch[1] : null,
      date: dateMatch ? dateMatch[1] : null,
      text: text.replace(/(<([^>]+)>)/gi, ""), // Remove HTML tags
    };
  };


  return (
    <section className="font-jet flex flex-col items-center justify-center">

      <div className="container mx-auto">


        <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
          <Typography className="text-2xl font-bold">En Yeni Bloglar</Typography>
          <Button className="h-10 shadow-xl capitalize">Tüm Bloglar</Button>
        </div>

        <div className="container flex flex-wrap justify-center w-full lg:w-4/6 mx-auto">
          {advisePosts.map((post, index) => {

            const { image, text } = extractImageAndDate(post.content);
            return (

              <Card key={index} className="bg-transparent p-4 md:w-1/2 lg:w-1/2 max-w-full shadow-none">

                <div className="h-full bg-gray-100 max-w-sm rounded-xl mx-auto shadow-xl">
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

        <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mt-40 mx-auto">
          <Typography className="text-2xl font-bold">Fit Tarifler</Typography>
          <Button className="h-10 shadow-xl capitalize">Tüm Tarifler</Button>
        </div>

        <div className="container flex flex-wrap justify-center w-full mx-auto hidden lg:flex">
          {recipePosts.map((post, index) => {

            const { image } = extractImageAndDate(post.content);
            return (

              <Card key={index} className="bg-transparent p-4 lg:w-1/4 shadow-none">
                <div className="h-full max-w-sm rounded-xl mx-auto ">
                  <div className="block w-76 items-center ">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={image ? image : DUMMY_IMAGE_URL}
                        alt="card-image"
                        className="w-full h-52 object-cover rounded-lg select-none hover:brightness-110 transition-all duration-500 shadow-xl"
                      />
                    </a>

                    <CardFooter className="w-full flex flex-row mt-1 p-1 bg-transparent justify-start text-sm">
                      <div className="w-3/5 text-left font-bold">
                        {post.title.substring(0, 20)}
                      </div>
                      <div className="w-2/5 text-right">
                        {post.formattedDate}

                      </div>
                    </CardFooter>

                  </div>
                </div>
              </Card>
            );
          })}

        </div>






        <Carousel className="flex flex-row items-center justify-start min-w-full lg:hidden"
          navigation={false}
          loop={true}
          autoplay={500}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronRight} />

            </IconButton>
          )}
        >

          {recipePosts.map((post, index) => {
            const { image } = extractImageAndDate(post.content);
            return (
              <div key={index} className="w-full flex flex-row items-center justify-center">
                <Card className="bg-transparent md:w-2/3 w-4/5 shadow-none">
                  <div className="w-full flex flex-wrap p-4">

                    <div className="block">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={image ? image : DUMMY_IMAGE_URL}
                          alt="card-image"
                          className="w-full h-52 object-cover rounded-lg select-none hover:brightness-110 transition-all duration-500 shadow-xl"
                        />
                      </a>
                      <CardFooter className="w-full flex flex-row mt-1 p-1 bg-transparent justify-center text-l">
                        <div className="w-1/2 text-left font-bold">{post.title}</div>
                        <div className="w-1/2 text-right">{post.formattedDate}</div>
                      </CardFooter>
                    </div>

                  </div>
                </Card>
              </div>
            );
          })}
        </Carousel>







      </div>
    </section>

  );

}