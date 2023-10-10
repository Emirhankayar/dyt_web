import { createSitemap } from "sitemap";
import fs from "fs";

const sitemap = createSitemap({
  hostname: "https://www.example.com", // Replace with your website's URL
  urls: [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/tavsiyeler", changefreq: "weekly", priority: 0.7 },
    { url: "/tarifler", changefreq: "weekly", priority: 0.7 },
    { url: "/iletisim", changefreq: "weekly", priority: 0.7 },
    // Add more URLs here
  ],
});

const xml = sitemap.toString();

fs.writeFileSync("public/sitemap.xml", xml); // Output the sitemap to the "public" directory
