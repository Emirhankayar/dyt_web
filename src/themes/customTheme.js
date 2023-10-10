// src/theme.js

const theme = ({
    typography: {
        defaultProps: {
          variant: "paragraph",
          color: "inherit",
          textGradient: false,
          className: "",
        },
        valid: {
          variants: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "lead",
            "paragraph",
            "small",
          ],
        },
        styles: {
          variants: {
            h1: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-5xl",
              fontWeight: "font-semibold",
              lineHeight: "leading-tight",
            },
            h2: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-4xl",
              fontWeight: "font-semibold",
              lineHeight: "leading-[1.3]",
            },
            // Logo 
            h3: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-l",
              fontWeight: "font-extrabold",
              lineHeight: "leading-snug",
            },
            // Section titles
            h4: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-2xl",
              fontWeight: "font-bold",
              lineHeight: "leading-snug",
            },
            // Sub Section titles
            h5: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-xl",
              fontWeight: "font-semibold",
              lineHeight: "leading-snug",
            },
            // Nav elements
            h6: {
              display: "block",
              fontSmoothing: "antialiased",
              letterSpacing: "tracking-normal",
              fontFamily: "font-inter",
              fontSize: "text-base",
              fontWeight: "font-regular",
              lineHeight: "leading-relaxed",
            },
            lead: {
              display: "block",
              fontSmoothing: "antialiased",
              fontFamily: "font-inter",
              fontSize: "text-md",
              fontWeight: "font-bold",
              lineHeight: "leading-relaxed",
            },
            paragraph: {
              display: "block",
              fontSmoothing: "antialiased",
              fontFamily: "font-inter",
              fontSize: "text-base",
              fontWeight: "font-light",
              lineHeight: "leading-loose",
              textAlign: 'justify', 

            },
            small: {
              display: "block",
              fontSmoothing: "antialiased",
              fontFamily: "font-inter",
              fontSize: "text-sm",
              fontWeight: "font-semibold",
              lineHeight: "leading-normal",
            },
          },
        },
  },


});

export default theme;
