/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bazzi: ["Bazzi", "sans-serif"],
        maplestory: ["Maplestory", "sans-serif"],
      },
      screens: {
        tablet2560: "2560px", // 기준 해상도
        xs: "375px", // 아이폰 mini
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.7) translateY(30px)" },
          "60%": { opacity: "1", transform: "scale(1.1) translateY(-10px)" },
          "100%": { transform: "scale(1) translateY(0)" },
        },
        /* 동화숲 로고 튀기는 애니메이션 */
        "triple-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-70px)" },
          "40%": { transform: "translateY(0)" },
          "60%": { transform: "translateY(-40px)" },
          "80%": { transform: "translateY(0)" },
          "90%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.6s ease-out",
        "triple-bounce": "triple-bounce 1.2s ease-in-out 1", // 1번만 재생!
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
