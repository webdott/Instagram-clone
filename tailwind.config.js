module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.js', './src/**/**/*.js']
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
      black: theme('colors.black.dark')
    }),
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '97': '97vh',
      'full': '100%',
      'screen': '100vh'
    },
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
        faded: '#0099f6'
      },
      black: {
        light: '#262626',
        faded: '#00000059',
        dark: '#000000'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        faded: '#8e8e8e',
        secondary: '#c7c7c7'
      },
      red: {
        primary: '#ed4956'
      }
    },
    screens: {
      'md': {'min': '768px'},
      '2md': {'min': '1000px'} 
    },
    'fontSize':{
      'xs': '.85rem',
      'sm': '.9rem',
      'xxs': '.75rem',
      '2xl': '1.5rem',
      '3xl': '2.2rem'
    },
    extend: {
      animation: {
        'wiggle': 'wiggle .5s normal forwards ease-in-out',
      },
      keyframes: {
       wiggle: {
         '0%, 100%': { transform: 'scale(1)' },
         '50%': { transform: 'scale(1.2)' },
        }
      }
    }
  },
  variants: {
    extend: {
      padding: ['hover'],
      backgroundColor: ['hover'],
      display: ['group-hover']
    }
  }
};