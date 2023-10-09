// services.js
const API_KEY = import.meta.env.VITE_BLOG_KEY;
const BLOG_URL = import.meta.env.VITE_BLOG_URL;

  export async function fetchBlogPosts(tag) {
    try {
      const response = await fetch(`${BLOG_URL}?key=${API_KEY}&labels=${tag}&orderBy=published&maxResults=40`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const formattedData = data.items.map((post) => {
        const publishedDate = new Date(post.published);
        const formattedDate = `${String(publishedDate.getDate()).padStart(2, '0')}.${String(publishedDate.getMonth() + 1).padStart(2, '0')}.${publishedDate.getFullYear()}`;
        return {
          ...post,
          formattedDate,
        };
      });
      return formattedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  

export default { fetchBlogPosts }