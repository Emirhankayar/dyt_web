// Recipes.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/services";
import ExpandingButton from "./Expand";
import { SkeletonRecipe } from './Skeleton';
import { Card, CardFooter, Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";

export default function RecipeCard() {
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
    setLoading(true);
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

  const displayedPosts = showAll ? recipePosts : recipePosts.slice(0, expanded ? recipePosts.length : numCols);

  return (
    <>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mt-40 mb-10 mx-auto">
        <Typography className="text-2xl font-bold">Fit Tarifler</Typography>
        <a href="/tarifler">
          <Button className="h-10 shadow-xl capitalize">Tüm Tarifler</Button>
        </a>
      </div>

      <div className="container mx-auto grid grid-cols-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
            Array.from({ length: numCols }).map((_, index) => (
              <SkeletonRecipe key={index} />
            ))
          ) : (
            displayedPosts.map((post, index) => {
              const { image, text } = extractImageAndDate(post.content);
            return (
              <Card
                key={index}
                className="p-4 h-full bg-transparent shadow-none mb-5"
              >
                <div className="h-full max-w-sm rounded-xl mx-auto ">
                  <div className="block w-76 items-center justify-center">

                    <Link to={`/tarifler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>


                      <LazyLoadImage
                        decoding="async"
                        fetchpriority="high"
                        useIntersectionObserver={true}
                        alt="card-image"
                        src={image}
                        effect="blur"
                        className="w-full h-[30vh] object-cover rounded-lg select-none hover:brightness-110 transition-all duration-500 overflow-hidden"
                        />
                      


                    </Link>
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
        {!loading && (
          <ExpandingButton expanded={expanded} onClick={toggleShowAll}/>
        )}
      </div>
    </>
  );
}
