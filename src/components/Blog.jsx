import React, { useState, useEffect, Suspense } from "react";
import he from "he"; // Import the 'he' library
import Spinner from './Spinner'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
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
    <section className="text-gray-100 font-jet flex flex-col items-center justify-center">

      <div className="container mx-auto">

        <h1 className="relative text-center text-2xl font-bold mb-10">Diyet Onerileri</h1>

        <div className="container flex flex-wrap justify-center w-full lg:w-4/6 mx-auto">
          {advisePosts.map((post, index) => {
            const { image, text } = extractImageAndDate(post.content);
            return (
              <Card key={index} className="bg-transparent p-4 md:w-1/2 lg:w-1/2 max-w-full">
                <div className="h-full bg-gray-900 max-w-sm rounded-xl mx-auto">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={image ? image : DUMMY_IMAGE_URL}
                      alt="card-image"
                      className="w-full h-52 object-cover rounded-t-lg select-none pointer-events-none"
                      />
                    <CardHeader className="inline-flex bg-transparent h-9 items-center mt-4 text-blue-500 
                    text-xl hover:text-2xl hover:text-blue-300 transition-all duration-300 font-bold">
                      {post.title}
                    </CardHeader>
                    <CardBody className="-mt-4">
                      <Typography className="text-justify leading-normal">
                        {text.substring(0, 200)}...
                      </Typography>
                      {post.formattedDate && (
                        <Typography className="text-gray-500 mt-4">
                          {post.formattedDate}
                        </Typography>
                      )}

                    </CardBody>
                    <CardFooter className="-mt-8">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <Button className="text-blue-500 bg-gray-300 hover:text-blue-300 font-bold">
                          Read More
                        </Button>
                      </a>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            );
          })}

        </div>


        <h1 className="relative text-center text-2xl font-bold mt-40 mb-10">Fit Tarifler</h1>

        <div className="container flex flex-wrap justify-center w-full lg:w-4/6 mx-auto">
          {recipePosts.map((post, index) => {
            const { image, text } = extractImageAndDate(post.content);
            return (
              <Card key={index} className="bg-transparent p-4 md:w-1/2 lg:w-1/2 max-w-full">
                <div className="h-full bg-gray-900 max-w-sm rounded-xl mx-auto">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={image ? image : DUMMY_IMAGE_URL}
                      alt="card-image"
                      className="w-full h-52 object-cover rounded-t-lg select-none pointer-events-none"
                      />
                    <CardHeader className="inline-flex bg-transparent h-9 items-center mt-4 text-blue-500 
                    text-xl hover:text-2xl hover:text-blue-300 transition-all duration-300 font-bold">
                      {post.title}
                    </CardHeader>
                    <CardBody className="-mt-4">
                      <Typography className="text-justify leading-normal">
                        {text.substring(0, 200)}...
                      </Typography>
                      {post.formattedDate && (
                        <Typography className="text-gray-500 mt-4">
                          {post.formattedDate}
                        </Typography>
                      )}

                    </CardBody>
                    <CardFooter className="-mt-8">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <Button className="text-blue-500 bg-gray-300 hover:text-blue-300 font-bold">
                          Read More
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

  );
     
}