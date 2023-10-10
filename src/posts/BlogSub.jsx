// BlogSub.jsx
import React, { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/services";
import { SkeletonBlogSub } from '../components/Skeleton';
import { Typography, Button } from "@material-tailwind/react";
import { extractImageAndDate } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { setupIntersectionObserver } from '../utils/utils';
import "../components/Animations.css"

export default function PostCard() {
  const [advisePosts, setAdvisePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  setupIntersectionObserver('.hidden-class', 'show');
  setupIntersectionObserver('.hidden-class-l', 'show-l');
  setupIntersectionObserver('.hidden-class-up', 'show-up');

  useEffect(() => {
    setLoading(true)
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


  const numItemsToDisplay = loading ? 4 : advisePosts.length;

  return (
    <>

      <div className="container flex flex-col justify-between w-5/6 items-center mb-10 mt-10 mx-auto">

        <div className="max-w-lg text-justify">
          <div className="hidden-class">
          <Typography variant='h4'>Tüm Tavsiyeler</Typography>
          </div>
          <div className="hidden-class-l">
          <Typography variant="paragraph" className="mt-2">Bu başlık altında, bir beslenme uzmanı olarak hazırladığım tavsiye bloglarını inceleyebilirsiniz. İçeriklerim, sağlıklı bir yaşam tarzına geçişinizi kolaylaştırmayı ve sağlık konularında size rehberlik etmeyi amaçlıyor. Dengeli beslenme, kilo kontrolü, besin takviyeleri ve sağlıklı yaşam hakkında güncel bilgileri burada bulabilirsiniz. Sağlığınızı iyileştirmek ve bilinçli beslenme alışkanlıkları geliştirmek için bu kaynakları keşfedin.</Typography>
          </div>
      </div>

      </div>

      <div className="container max-w-lg">
        <div className="hidden-class-up">
        <div className="grid grid-cols-1 mx-auto w-full">
          {loading ? (
            Array.from({ length: numItemsToDisplay }).map((_, index) => (
              <SkeletonBlogSub key={index} />
            ))
          ) : (
            advisePosts.slice(0, numItemsToDisplay).map((post, index) => {
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


                        <Link to={`/tavsiyeler/${encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'))}`}>
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
        </div>



    </>
  );
}
