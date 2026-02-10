/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins-Regular'],
        "poppins-medium":['Poppins-Medium'],
        "poppins-semibold":['Poppins-SemiBold'],
        "poppins-bold":['Poppins-Bold'],
        railway:['Railway'],
        "railway-bold":['Railway-Bold'],
        inter:['Inter-Regular'],
        "inter-semibold":['Inter-SemiBold'],
        "inter-bold":['Inter-Bold'],

      }
    },
  },
  plugins: [],
}
