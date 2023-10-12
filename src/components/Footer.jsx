import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const LINKS = [
  {
    title: "Bölümler",
    items: [
      { text: "Anasayfa", link: "/" },
      { text: "Tavsiyeler", link: "/tavsiyeler" },
      { text: "Tarifler", link: "/tarifler" },
      { text: "İletişim", link: "/iletisim" },
    ],
  },
  {
    title: "Sosyal Medya",
    items: [
      { text: "Instagram", link: "https://www.instagram.com/dyt.zeynepsekinpunar" },
      { text: "Twitter", link: "https://twitter.com/ZSekinpunar" },
      { text: "Facebook", link: "https://www.facebook.com/zeynep.sekinpunar/" },
    ],
  },
];

const socialMediaIcons = {
  Twitter: faXTwitter,
  Facebook: faFacebook,
  Instagram: faInstagram,
};

const currentYear = new Date().getFullYear();

export default function FooterWithSocialLinks() {
  return (
    <footer className="relative w-full bg-gray-200 pt-10 border-t-2 border-gray-300">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <a href="/">
            <Typography variant="h6" className="mb-6 !font-semibold">
              Diyetisyen Zeynep
            </Typography>

          </a>
          <div className="grid grid-cols-2 justify-between gap-2">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>

                {items.map(({ text, link }) => (
                  <li key={text}>
                    <Typography
                      as="a"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="gray"
                      variant="small"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >

                      {socialMediaIcons[text] && (
                        <>
                          <FontAwesomeIcon
                            icon={socialMediaIcons[text]}
                            className="mr-2"
                          />
                          {text}
                        </>
                      )}

                      {!socialMediaIcons[text] && text}
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
            &copy; {currentYear} <a href="/">Diyetisyen Zeynep</a>, Tüm Hakları Saklıdır.
          </Typography>
        </div>
      </div>
    </footer>
  );
}