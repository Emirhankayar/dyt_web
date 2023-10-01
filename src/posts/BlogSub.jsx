// PostSub.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/services";
import { SkeletonBlog } from '../components/Skeleton';
import { Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate, getNumCols, handleResize } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function PostCard() {
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

    const displayedPosts = advisePosts;
      

    return (
        <>
            <div className="container flex flex-col justify-between w-5/6 items-center mb-10 mt-10 mx-auto">
                <div className="max-w-lg text-justify">
                    <Typography className="text-2xl font-bold">Tüm Bloglar</Typography>
                    <Typography className="text-md mt-2">Bu başlık altında, bir beslenme uzmanı olarak hazırladığım blogları inceleyebilirsiniz. İçeriklerim, sağlıklı bir yaşam tarzına geçişinizi kolaylaştırmayı ve sağlık konularında size rehberlik etmeyi amaçlıyor. Dengeli beslenme, kilo kontrolü, besin takviyeleri ve sağlıklı yaşam hakkında güncel bilgileri burada bulabilirsiniz. Sağlığınızı iyileştirmek ve bilinçli beslenme alışkanlıkları geliştirmek için bu kaynakları keşfedin.</Typography>
                </div>

                </div>

                    <div className="container">
                        <div className="grid grid-col-1 w-full justify-center ">
                        {isLoading ? (
                            Array.from({ length: numCols }).map((_, index) => (
                                <SkeletonBlog key={index} />
                            ))
                        ) : (

                            displayedPosts.map((post, index) => {
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
