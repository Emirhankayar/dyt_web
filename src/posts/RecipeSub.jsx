// RecipeSub.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/services";
import { SkeletonBlogSub } from '../components/Skeleton';
import { Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate, getNumCols, handleResize } from '../utils/utils';
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

                <div className="container">
                <div className="grid grid-col-1 w-full justify-center">
                {loading ? (
                        Array.from({ length: numItemsToDisplay }).map((_, index) => (
                            <SkeletonBlogSub key={index} />
                        ))
                    ) : (
                        recipePosts.slice(0, numItemsToDisplay).map((post, index) => {
                                const { image } = extractImageAndDate(post.content);
                                return (
                                  <div key={index} className="p-4">

                                    <div className="max-w-lg h-[100px] grid grid-cols-1 rounded-lg shadow-xl text-gray-100 relative">
                                            
                                        <LazyLoadImage
                                          decoding="async"
                                          fetchpriority="high"
                                          useIntersectionObserver={true}
                                          alt="card-image"
                                          src={image}
                                          effect="blur"
                                          className="w-full h-[100px] absolute object-cover object-center rounded-lg backdrop-brightness-20"
                                        />

                                        <div className="w-full h-[100px] relative bg-black rounded-lg bg-opacity-40 flex flex-row items-center py-2 lg:px-40 md:px-40 sm:px-40 px-10">
                                            
                                          <a
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                          ></a>
                                          <div className="flex-grow">
                                            <div className="font-bold font-md overflow-hidden">
                                              {post.title.length >= 10
                                                ? post.title.substring(0, 10) + "..."
                                                : post.title}
                                            </div>
                                            <div className="flex items-center text-sm">
                                              {post.formattedDate}
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-end">
                                          <Link to={`/tarifler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>

                                            <Button
                                              variant="text"
                                              className="flex items-center gap-2 capitalize text-md text-gray-100"
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
