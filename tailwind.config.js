// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ['Inter', 'sans-serif'],
//         poppins: ['Poppins', 'sans-serif'],
//         roboto: ['Roboto', 'sans-serif'],
//         montserrat: ['Montserrat', 'sans-serif'],
//         lato: ['Lato', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }
/**
 * 
 *//*module.exports e pata */

  /**@type {import('tailwindcss').Config} */
export default {
  content : ['./src/**/*.{js,jsx,ts,tsx}'],
theme : {
    fontFamily : {
        primary : 'Poppins'
    },
    container :{
        padding : {
            DEFAULT : '1.5rem',
            Ig :'3rem'
        },
    },

    screens : {
        sm : '640px',
        md : '780px',
        Ig : '1024px',
        xl : '1280px'
    },
    colors : {
        body : '#E5E5E5',
        blue : {
            DEFAULT : '#000958',
            secondary : '#67698B',
        },
        orange : {
            DEFAULT : '#FFB800',
            secondary : '#FFB800',
            tertiary : '#FFB800',
            quaternary : '#FFFAF5',
            hover : '#FB3D08',
        },

        yellow : {
            DEFAULT : '#FFDA54',
            secondary : '#FFF3D2',
        },

        white : '#FFFFFF',
        pink : 'pink',
        transparent: 'transparent',
    },

    extend : {
        backgroundImage : {
            triangle :"url('/src/assets/img/triangle.svg')",
        },
        boxShadow : {
            primary : '0px 4px 40px rgba (0. 0. 0. 0.3)',
        },
    }
    
  },
  plugins : [],
};