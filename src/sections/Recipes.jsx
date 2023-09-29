// Recipes.jsx
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { fetchBlogPosts } from "../services/services";
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import ExpandingButton from "../components/Expand";
import { SkeletonRecipe } from '../components/Skeleton';


import {
  Card,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const DUMMY_IMAGE_URL = import.meta.env.VITE_DUMMY_IMG;

export default function RecipeCard() {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
      // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when content is loaded
      }, 1500); // Adjust the delay time as needed
    }, []);
  
  

  const [recipePosts, setRecipePosts] = useState([]);
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
    const fetchRecipes = async () => {
      try {
        const recipePostsData = await fetchBlogPosts("Recipe");
        setRecipePosts(recipePostsData);
      } finally {

        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const displayedPosts = showAll ? recipePosts : recipePosts.slice(0, expanded ? recipePosts.length : numCols);

  return (
    <>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mt-40 mx-auto">
        <Typography className="text-2xl font-bold">Fit Tarifler</Typography>

        <a
          href="https://diyetzamanidostum.blogspot.com/search/label/Recipe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="h-10 shadow-xl capitalize">Tüm Tarifler</Button>
        </a>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
            Array.from({ length: numCols }).map((_, index) => (
              <SkeletonRecipe key={index} />
            ))
          ) : (
            displayedPosts.map((post, index) => {
              const { image, text } = extractImageAndDate(post.content);
            return (
              <Card
                key={index}
                className="p-4 h-full bg-transparent shadow-none"
              >
                <div className="h-full max-w-sm rounded-xl mx-auto ">
                  <div className="block w-76 items-center ">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image ? image : DUMMY_IMAGE_URL}
                        alt="card-image"
                        role="presentation"
                        sizes="(max-width: 800px) 100vw, 50vw"
                        decoding="async"
                        fetchpriority="high"
                        loading="lazy"
                        className="w-full h-52 object-cover rounded-lg select-none hover:brightness-110 transition-all duration-500 shadow-xl"
                      />
                    </a>

                    <CardFooter className="w-full flex flex-row mt-1 p-1 justify-start text-sm">
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
            })
          )}
        </div>
            <ExpandingButton expanded={expanded} onClick={toggleShowAll} />
      </div>
    </>
  );
}
