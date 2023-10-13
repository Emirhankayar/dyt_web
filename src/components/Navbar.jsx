import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
const SocLinks = React.lazy(() => import('./SocLinks'));
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation




export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const location = useLocation(); // Get the current route


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
    <div className="flex gap-2 hover:underline transition-all duration-300">

          <SocLinks/>

    </div>
  );

  const navList = (
    <ul className="mb-10 mt-10 flex flex-col items-start gap-10 lg:mb-0 lg:mt-0 lg:h-max lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className={`p-2 hover:underline transition-all duration-300 ${location.pathname === "/" ? "text-blue-500 " : ""}`} // Check if the current route is '/'
      >
        <Link to="/" className="flex items-center">Anasayfa</Link> {/* Use Link instead of <a> */}
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className={`p-2 hover:underline transition-all duration-300 ${location.pathname === "/tavsiyeler" ? "text-blue-500 " : ""}`} // Check if the current route is '/tavsiyeler'
      >
        <Link to="/tavsiyeler" className="flex items-center">Tavsiyeler</Link> {/* Use Link instead of <a> */}
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className={`p-2 hover:underline transition-all duration-300 ${location.pathname === "/tarifler" ? "text-blue-500 " : ""}`} // Check if the current route is '/tarifler'
      >
        <Link to="/tarifler" className="flex items-center">Tarifler</Link> {/* Use Link instead of <a> */}
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className={`p-2 hover:underline transition-all duration-300 ${location.pathname === "/iletisim" ? "text-blue-500 " : ""}`} // Check if the current route is '/iletisim'
      >
        <Link to="/iletisim" className="flex items-center">İletişim</Link> {/* Use Link instead of <a> */}
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="gray"
        className="p-2 hover:underline transition-all duration-300 lg:hidden"
      >
        <div className="">
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
            variant="paragraph"
            className="mr-4 cursor-pointer py-1.5 !font-semibold hover:text-gray-600 transition-color duration-300"
          >
            Diyetisyen Zeynep
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              color="gray"
              className="ml-auto h-6 w-6 text-inherit lg:hidden"
              ripple={false}
              aria-label="navigasyon butonu aç ve kapat"
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


          <Typography variant="lead" color="blue-gray">
            Menü
          </Typography>

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
