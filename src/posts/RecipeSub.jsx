// RecipeSub.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/services";
import { SkeletonBlogSub } from '../components/Skeleton';
import { Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";

export default function RecipeCard() {
    const [recipePosts, setRecipePosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
          setLoading(true);
            try {
                const recipePostsData = await fetchBlogPosts("Recipe");
                setRecipePosts(recipePostsData);
            } finally {

                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const numItemsToDisplay = loading ? 4 :  recipePosts.length;

    return (
        <>
            <div className="container flex flex-col justify-between w-5/6 items-center mb-10 mt-10 mx-auto">
                <div className="max-w-lg text-justify">
                    <Typography className="text-2xl font-bold">Tüm Tarifler</Typography>
                    <Typography className="text-md mt-2 leading-loose">Bu başlık altında, tarafımdan özenle hazırlanmış olan tüm sağlıklı ve fit tariflere göz atabilirsiniz. Sağlıklı yaşam tarzınıza katkıda bulunacak bu tarifler, lezzet ve besin değeri açısından zengindir. Aradığınız sağlıklı yemek seçeneklerini burada bulabilir ve daha sağlıklı bir yaşam tarzına adım atabilirsiniz.</Typography>
                </div>
                </div>

                <div className="container max-w-lg">
        <div className="grid grid-cols-1 mx-auto w-full">
          {loading ? (
            Array.from({ length: numItemsToDisplay }).map((_, index) => (
              <SkeletonBlogSub key={index} />
            ))
          ) : (
            recipePosts.slice(0, numItemsToDisplay).map((post, index) => {
              const { image } = extractImageAndDate(post.content);

              return (
                <div key={index} className="p-4 h-full">

                  <div className="w-full grid grid-cols-1 rounded-lg shadow-xl text-gray-100 relative">
                    <LazyLoadImage
                      decoding="async"
                      fetchpriority="high"
                      loading="lazy"
                      useIntersectionObserver={true}
                      alt="card-image"
                      src={image}
                      effect="blur"
                      className="w-full h-[100px] absolute object-cover object-center rounded-lg brightness-50"
                    />

                    <div className="w-full min-h-[100px] relative rounded-lg flex items-center justify-center">

                      <div className="flex flex-row justify-between w-full items-start px-8">
                        
                        <div className="flex flex-col justify-center items-start w-1/2">
                          <Typography variant="lead">
                            {post.title}
                          </Typography>
                          <Typography variant="small">
                            {post.formattedDate}
                          </Typography>
                        </div>


                        <Link to={`/tarifler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>
                          <Button
                            variant="text"
                            aria-label="gözat"
                            className="capitalize text-sm text-gray-100 flex flex-row items-center justify-center gap-2"
                          >
                            Gözat{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </Button>
                        </Link>


                      </div>
                    </div>
                  </div>
                </div>

              );
            })

          )}
        </div>

      </div>

    </>
  );
}
