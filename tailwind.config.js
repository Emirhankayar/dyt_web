const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        //'jet': ['"JetBrains Mono"'],
        //'orbitron': ["Orbitron"],
      },
      animation: {

      },
      keyframes: {

      },
      colors: {

      },
    },
  },
  plugins: [],
});