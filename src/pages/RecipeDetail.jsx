import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPosts } from "../services/services";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { extractImageAndDate } from '../utils/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../components/Spinner'



export default function PostDetail() {
    const { postTitle } = useParams(); // Get the postTitle from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Decode the URL-encoded postTitle
    const decodedPostTitle = decodeURIComponent(postTitle);

    useEffect(() => {

        const fetchPost = async () => {
            setLoading(true)
            try {
                const posts = await fetchBlogPosts("Recipe"); // Assuming 'Advise' is the category
                const foundPost = posts.find(post => post.title.toLowerCase().replace(/ /g, '-') === decodedPostTitle.toLowerCase().replace(/ /g, '-'));

                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setPost(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [decodedPostTitle]);

    if (loading) {
        return <div className="min-h-screen"><Spinner/></div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }
    const { image, text } = extractImageAndDate(post.content);
    return (
        <>
            <div className="bg-gray-300 w-screen flex flex-col items-center justify-center py-40">

                <div className="w-4/5 max-w-lg flex flex-col items-center justify-center text-justify text-center">
                    <div className="w-full">
                        <div className="flex flex-row justify-center items-center">
                            <div className="p-4 w-full flex flex-col items-start text-xl font-bold">{post.title}</div>
                            <div className="p-4 w-full flex flex-col items-end">{post.formattedDate}</div>
                        </div>
                        <LazyLoadImage
                            src={image}
                            decoding="async"
                            useIntersectionObserver={true}
                            fetchpriority="high"
                            alt="card-image"
                            effect="blur"
                            className="rounded-lg shadow-xl my-10 w-lg max-h-md" />

                        <p className="text-justify">{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
