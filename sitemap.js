import SitemapGenerator from 'sitemap-generator';
import fs from 'fs';

const generator = SitemapGenerator('https://dytzeynep.netlify.app', {
  stripQuerystring: false, // Adjust options as needed
});

generator.on('done', (sitemap) => {
  fs.writeFileSync('public/sitemap.xml', sitemap.toString());
});

generator.start();
