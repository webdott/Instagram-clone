module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: ['./src/**/*.js', './src/**/**/*.js']
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
        faded: '#0099f6'
      },
      black: {
        light: '#262626',
        faded: '#00000059'
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
      '2md': {'min': '1000px'} 
    },
    'fontSize':{
      'xs': '.85rem',
      'xxs': '.75rem'
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