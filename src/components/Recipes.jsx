// Recipes.jsx
import React, { useState, useEffect, useRef } from "react";
import { fetchBlogPosts } from "../services/services";
import ExpandingButton from "./Expand";
import { SkeletonRecipe } from './Skeleton';
import { Card, CardFooter, Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate, getNumCols, handleResize, useToggleShowAll } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { setupIntersectionObserver, fetchIntersectionObserver } from '../utils/utils'; // Import the utility function
import './Animations.css'

export default function RecipeCard() {
  const [recipePosts, setRecipePosts] = useState([]);
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
          const advisePostsData = await fetchBlogPosts("Recipe");
  
          const maxPosts = 6;
          setRecipePosts(advisePostsData.slice(0, maxPosts));
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }
  }, [inViewport]);


  const displayedPosts = showAll ? recipePosts : recipePosts.slice(0, expanded ? recipePosts.length : numCols);

  return (
    <>
    <div className="hidden-class">

      <div className="container flex flex-wrap justify-between w-5/6 items-center mt-40 mb-10 mx-auto">
        <Typography variant="h4" >Fit Tarifler</Typography>
        <a href="/tarifler">
          <Button variant="gradient" color="light-blue" className="h-10 shadow-xl capitalize font-light transition-all duration-300">Tüm Tarifler</Button>
        </a>
      </div>
    </div>

      <div className="hidden-class-up" ref={cardRef}>

      <div className="container mx-auto grid grid-cols-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
            Array.from({ length: numCols }).map((_, index) => (
              <SkeletonRecipe key={index} />
            ))
          ) : (
            displayedPosts.map((post, index) => {
              const { image } = extractImageAndDate(post.content);
            return (
              <Card
                key={index}
                className="p-4 h-full bg-transparent shadow-none"
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
                        className="w-screen h-[30vh] object-cover rounded-lg select-none hover:brightness-110 transition-all duration-500 shadow-xl"
                      />

                      


                    </Link>
                    <CardFooter className="w-full flex flex-row mt-1 p-1 justify-start text-sm">
                      <Typography variant="small" className="w-3/5 text-left font-semibold">
                        {post.title.substring(0, 20)}
                      </Typography>
                      <Typography variant='small' className="w-2/5 text-right">
                        {post.formattedDate}
                      </Typography>
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
      </div>

    </>
  );
}
