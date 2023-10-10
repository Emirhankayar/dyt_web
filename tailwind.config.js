const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans'],
      },
      animation: {
        'slide-in-left': 'slideInLeft 1s both',
        'slide-in-right': 'slideInRight 1s both',
        'slide-in-down': 'slideInDown 2s infinite', 
        'shimmer': 'shimmer 1s infinite',
      },

      keyframes: {
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideInDown: { 
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
        
    },
  },
  plugins: [],
});
