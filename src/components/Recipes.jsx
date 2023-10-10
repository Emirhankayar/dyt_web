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
import { setupIntersectionObserver, setupIntersectionObserverUP } from '../utils/utils'; // Import the utility function
import './Animations.css'

export default function RecipeCard() {
  const [recipePosts, setRecipePosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [numCols, setNumCols] = useState(getNumCols());
  const { showAll, expanded, toggleShowAll } = useToggleShowAll(false); 
  const [inViewport, setInViewport] = useState(false);
  const cardRef = useRef(null);

  setupIntersectionObserver('.hidden-class');
  setupIntersectionObserverUP('.hidden-class-up');

  useEffect(() => {
    const removeResizeListener = handleResize(setNumCols);

    return () => {

      removeResizeListener();
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.5, // Trigger when 50% of the element is in the viewport
    };
  
    const observer = new IntersectionObserver(([entry]) => {
      // Check if the entry is intersecting (in the viewport)
      if (entry.isIntersecting) {
        setInViewport(true);
        // Disconnect the observer to stop observing once triggered
        observer.disconnect();
      }
    }, options);
  
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
  
    return () => {
      observer.disconnect(); // Clean up the observer when the component unmounts
    };
  }, []);
  

  useEffect(() => {
    if (inViewport) {
      setLoading(true);
      const fetchPosts = async () => {
        try {
          const recipePostsData = await fetchBlogPosts("Recipe");
          setRecipePosts(recipePostsData);
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
          <Button className="h-10 shadow-xl capitalize">Tüm Tarifler</Button>
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
