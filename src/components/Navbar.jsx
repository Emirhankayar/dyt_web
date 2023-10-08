import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const socialMediaIcons = {
  Twitter: faTwitter,
  Facebook: faFacebook,
  Youtube: faYoutube,
  Instagram: faInstagram,
};

export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const closeDrawerOnLgScreen = () => {
    if (window.innerWidth >= 960) {
      closeDrawerRight();
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", closeDrawerOnLgScreen);
    return () => {
      window.removeEventListener("resize", closeDrawerOnLgScreen);
    };
  }, []);

  const socialMediaLinks = (
    <div className="flex gap-2">
      {Object.keys(socialMediaIcons).map((socialMedia) => (
        <IconButton
          key={socialMedia}
          variant="filled"
          color="blue-gray"
          ripple={false}
          onClick={() => window.open(socialMediaLinks[socialMedia], "_blank")}
        >
          <FontAwesomeIcon icon={socialMediaIcons[socialMedia]} />
        </IconButton>
      ))}
    </div>
  );

  const navList = (
    <ul className="mb-10 mt-10 flex flex-col items-start gap-10 lg:mb-0 lg:mt-0 lg:h-max lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant='h6'
        color="blue-gray"
        className="p-2 font-normal"
      >
        <a href="/" className="flex items-center">
          Anasayfa
        </a>
      </Typography>
      <Typography
        as="li"
        variant='h6'
        color="blue-gray"
        className="p-2 font-normal"
      >
        <a href="/tavsiyeler" className="flex items-center">
          Tavsiyeler
        </a>
      </Typography>
      <Typography
        as="li"
        variant='h6'
        color="blue-gray"
        className="p-2 font-normal"
      >
        <a href="/tarifler" className="flex items-center">
          Tarifler
        </a>
      </Typography>
      <Typography
        as="li"
        variant='h6'
        color="blue-gray"
        className="p-2 font-normal"
      >
        <a href="/iletisim" className="flex items-center">
          İletişim
        </a>
      </Typography>
      <Typography
        as="li"
        variant='h6'
        color="blue-gray"
        className="p-2 font-normal block lg:hidden "
      >
        <div className="flex-col">
          <div className="flex items-center mb-8">
            Sosyal Medya
          </div>
          {socialMediaLinks}
        </div>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar
        className="fixed top-0 left-0 max-w-full rounded-none py-2 px-8 z-40 lg:px-8 lg:py-2"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            Dyt. Zeynep
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              color="gray"
              className="ml-auto h-6 w-6 text-inherit lg:hidden"
              ripple={false}
              onClick={openDrawerRight}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>

      <Drawer
        placement="right"
        overlay={true}
        open={openRight}
        onClose={closeDrawerRight}
        className="p-8"
        overlayProps={{
          className: "fixed inset-0 bg-gray bg-opacity-60 backdrop-blur-sm",
        }}
      >
        <div className="mb-6 flex flex-row items-center justify-between">
          <a href="/">

          <Typography variant="h6" color="blue-gray">
            Dyt. Zeynep
          </Typography>
          </a>
          <IconButton
            variant="text"
            color="gray"
            onClick={closeDrawerRight}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {navList}
      </Drawer>
    </>
  );
}
