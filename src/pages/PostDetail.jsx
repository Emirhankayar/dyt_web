import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPosts } from "../services/services";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { extractImageAndDate } from '../utils/utils';

export default function PostDetail() {
    const { postTitle } = useParams(); // Get the postTitle from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Decode the URL-encoded postTitle
    const decodedPostTitle = decodeURIComponent(postTitle);

    useEffect(() => {
        setLoading(true);
        const fetchPost = async () => {
            try {
                const posts = await fetchBlogPosts("Advise"); // Assuming 'Advise' is the category
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
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }
    const { image, text } = extractImageAndDate(post.content);
    return (
        <div className="bg-gray-300 w-screen flex flex-col items-center justify-center py-40">
            
            <div className="w-3/5 flex flex-col items-center justify-center text-justify text-center">
                <h2 className="flex flex-col p-4 w-full">{post.title}{post.formattedDate}</h2>
                <img src={image} alt="" />
                <p>{text}</p>
            </div>
        </div>
    );
}
