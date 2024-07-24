/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode : "class",
  theme: {
    extend: {
      colors: {
        darkPurple: "#360B40",
        whiteBg: "#F3F4F8",
        yellow: "#FFC916",
        darkBg : "#181818",
        
      },
      fontFamily: {
        titanium: ["Titillium Web"],
        Poppins: ["Poppins"],
        Roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
