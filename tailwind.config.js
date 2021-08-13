module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.js', './src/**/*.jsx', './src/**/**/*.js', './src/**/**/*.jsx']
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
      black: theme('colors.black.dark')
    }),
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'picture-small': '50vh',
      'picture': '70vh',
      'full': '100%',
      'screen': '100vh'
    },
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'modal-desc': '250px',
      'picture': '60vh',
      '97': '97vh',
      'full': '100%',
      'screen': '100vh'
    },
    maxWidth: {
      'modal-picture': '580px',
      'modal-desc': '335px',
      'custom-sm': '620px',
      'modal': '915px',
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
        dark: '#000000',
        modal: 'rgba(0, 0, 0, .3)'
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
      // 'extra-sm': {'min': '346px'},
      'custom-sm': {'min': '540px'},
      'sm': {'min': '640px'},
      'extra-sm': {'min': '750px'},
      'md': {'min': '768px'},
      '2md': {'min': '1000px'} 
    },
    'fontSize':{
      'xs': '.85rem',
      'sm': '.9rem',
      'xxs': '.75rem',
      '2xl': '1.5rem',
      '2.5xl': '2rem',
      '3xl': '2.2rem'
    },
    extend: {
      height: {
        '100': '100px',
        '130': '130px',
        '150': '150px',
        '170': '170px',
        '200': '200px',
        '230': '230px',
        '300': '300px',
      },
      width: {
        '100': '100px',
        '130': '130px',
        '150': '150px',
        '170': '170px',
        '200': '200px',
        '230': '230px',
        '300': '300px',
        'modal-picture': '440px',
      },
      minWidth: {
        'modal-desc': '335px',
      },
      animation: {
        'wiggle': 'wiggle .5s normal forwards ease-in-out',
      },
      keyframes: {
       wiggle: {
         '0%, 100%': { transform: 'scale(1)' },
         '50%': { transform: 'scale(1.2)' },
        }
      },
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