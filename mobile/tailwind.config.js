// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", './screens/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend:
      {
        fontSize:{
          'xxs':'1.5rem'
        }
      }
  },
  plugins: [],
}