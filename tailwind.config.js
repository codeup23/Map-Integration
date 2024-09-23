
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        'xs': '350px',
        'xxs': '300px', // Custom breakpoint for 300px screens
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateX(-100px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },

        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(200px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out forwards',
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      },
    },
  },
  variants: {
        extend: {},
      },
  plugins: [],
};
