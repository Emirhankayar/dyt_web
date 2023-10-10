import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPosts } from "../services/services";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { extractImageAndDate } from '../utils/utils';
import { Typography } from "@material-tailwind/react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../components/Spinner'

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
        return <div className="min-h-screen"><Spinner/></div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const { image, text } = extractImageAndDate(post.content);

    const splitTextIntoColumns = (text) => {
        const words = text.split(' ');
        const midpoint = Math.ceil(words.length / 2);
        const column1 = words.slice(0, midpoint).join(' ');
        const column2 = words.slice(midpoint).join(' ');

        return [column1, column2];
    };

    const [column1Text, column2Text] = splitTextIntoColumns(text);

    return (
        <>
            <div className="bg-gray-300 w-screen flex flex-col items-center justify-center py-40">
                <div className="w-4/5 max-w-4xl flex flex-col items-center justify-center text-justify text-center">
                    <div className="w-full">
                        <div className="flex flex-row justify-center items-center">
                        <Typography variant='h4' className="p-4 w-full flex flex-col items-start">{post.title}</Typography>
                            <Typography
                                variant="h6" className="p-4 w-full flex flex-col items-end">{post.formattedDate}</Typography>
                        </div>
    
                        <div className="image-container rounded-lg shadow-xl my-10">
                            <div className="cover-image" style={{ backgroundImage: `url(${image})` }}></div>
                        </div>
    
                        <div className="columns flex flex-col md:flex-row justify-between gap-10">
                            <div className="column md:w-1/2">
                                <Typography variant='paragraph' className="hidden sm:hidden md:hidden lg:block">{column1Text}</Typography>
                            </div>
                            <div className="column md:w-1/2">
                                <Typography variant="paragraph" className="hidden sm:hidden md:hidden lg:block">{column2Text}</Typography>
                            </div>
                        </div>
                        
                        <Typography variant="paragraph" className="block sm:block md:block lg:hidden">{text}</Typography>

                    </div>
                </div>
            </div>
            <style>
                {`
                    .image-container {
                        height: 400px; /* Set the desired fixed height for the image container */
                        overflow: hidden; /* Ensure the image doesn't overflow the container */
                    }
    
                    .cover-image {
                        width: 100%; /* Make the image container full width */
                        height: 100%; /* Make the image container full height */
                        background-size: cover; /* Cover the container while maintaining aspect ratio */
                        background-position: center; /* Center the image horizontally and vertically */
                    }

                    .columns {
                        display: flex;
                        flex-direction: column; /* Display as a single column by default */
                    }

                    .column {
                        width: 100%; /* Default to full width for mobile */
                    }

                    @media (min-width: 768px) { /* Apply styles for medium (md) and larger screens */
                        .columns {
                            flex-direction: row; /* Display as two columns for md and larger screens */
                        }

                        .column {
                            width: 48%; /* Adjust as needed to control the width of each column */
                        }
                    }
                `}
            </style>
        </>
    );
}