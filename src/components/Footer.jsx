import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const LINKS = [
  {
    title: "Bölümler",
    items: ["Anasayfa", "Bloglar", "Bize Ulaşın"],
  },
  {
    title: "Sosyal Medya",
    items: ["Instagram", "Facebook", "Youtube", "Twitter"],
  },
  {
    title: "Kaynaklar",
    items: ["Blog", "Email Bülteni"],
  },
];
const socialMediaIcons = {
  Twitter: faTwitter,
  Facebook: faFacebook,
  Youtube: faYoutube,
  Instagram: faInstagram,
};
 
const currentYear = new Date().getFullYear();
 
export default function FooterWithSocialLinks() {
  return (
    <footer className="relative w-full bg-gray-200 pt-10 border-t-2 border-gray-300">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <a href="/">
          <Typography variant="h5" className="mb-6">
            Dyt. Zeynep
          </Typography>

          </a>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>

                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {/* Render the icon based on the social media name */}
                      {socialMediaIcons[link] && (
                        <>
                          <FontAwesomeIcon
                            icon={socialMediaIcons[link]}
                            className="mr-2"
                          />
                          {link}
                        </>
                      )}
                      {/* If the link doesn't match a known social media name, render it as text */}
                      {!socialMediaIcons[link] && link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear} <a href="#">Dyt. Zeynep</a>, Tüm Hakları Saklıdır.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            {/* Your social media links here */}
          </div>
        </div>
      </div>
    </footer>
  );
}