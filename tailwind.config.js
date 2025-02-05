module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        logocolor: "#014085",
        pink: "#ed008c",
        white: "#ffff", // Lowercase 'white'
        gray: "#4d5765",
        blue: "#2044b0"
      },
      backgroundColor: {
        bgcolor: "#eff6ff", 
      },
      screens: {
        sm375: '375px', 
        sm425: '425px',
        sm573: '573px', 
        sm879: '879px',
        lgm: '1025px',
        lgd: '1200px',
        lgs: '1500px',
        lgl: '2000px',
      },
    },
  },
  plugins: [],
};