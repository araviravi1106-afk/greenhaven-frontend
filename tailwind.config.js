/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      /* ── COLORS ── */
      colors: {
        primary: {
          light:   '#4CAF50',
          DEFAULT: '#2E7D32',
          dark:    '#1B5E20',
        },
        earth: {
          light:   '#A1887F',
          DEFAULT: '#8D6E63',
          dark:    '#6D4C41',
        },
        cream: {
          light:   '#FAF9F6',
          DEFAULT: '#F5F5DC',
        },
        nature: {
          50:  '#F1F8E9',
          100: '#DCEDC8',
          200: '#C5E1A5',
          300: '#AED581',
          400: '#9CCC65',
          500: '#8BC34A',
          600: '#7CB342',
          700: '#689F38',
          800: '#558B2F',
          900: '#33691E',
        },
      },

      /* ── FONTS ── */
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },

      /* ── FONT SIZES ── */
      fontSize: {
        'xs':   ['12px', { lineHeight: '16px' }],
        'sm':   ['13px', { lineHeight: '20px' }],
        'base': ['15px', { lineHeight: '24px' }],
        'lg':   ['17px', { lineHeight: '28px' }],
        'xl':   ['19px', { lineHeight: '28px' }],
        '2xl':  ['22px', { lineHeight: '32px' }],
        '3xl':  ['28px', { lineHeight: '36px' }],
        '4xl':  ['34px', { lineHeight: '42px' }],
        '5xl':  ['44px', { lineHeight: '52px' }],
        '6xl':  ['56px', { lineHeight: '64px' }],
        '7xl':  ['70px', { lineHeight: '78px' }],
      },

      /* ── BORDER RADIUS ── */
      borderRadius: {
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '14px',
        '2xl':  '16px',
        '3xl':  '20px',
        '4xl':  '24px',
        'full': '9999px',
      },

      /* ── SHADOWS ── */
      boxShadow: {
        'soft':    '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card':    '0 8px 32px rgba(46, 125, 50, 0.12)',
        'strong':  '0 12px 48px rgba(0, 0, 0, 0.15)',
        'inner':   'inset 0 2px 8px rgba(0, 0, 0, 0.06)',
        'green':   '0 6px 20px rgba(76, 175, 80, 0.4)',
        'white':   '0 4px 20px rgba(255, 255, 255, 0.15)',
        'none':    'none',
      },

      /* ── SPACING ── */
      spacing: {
        '18':  '72px',
        '22':  '88px',
        '26':  '104px',
        '30':  '120px',
        '34':  '136px',
        '36':  '144px',
        '38':  '152px',
        '42':  '168px',
        '46':  '184px',
        '50':  '200px',
        '72':  '288px',
        '80':  '320px',
        '88':  '352px',
        '96':  '384px',
        '128': '512px',
      },

      /* ── MAX WIDTH ── */
      maxWidth: {
        'xs':   '320px',
        'sm':   '384px',
        'md':   '448px',
        'lg':   '512px',
        'xl':   '576px',
        '2xl':  '672px',
        '3xl':  '768px',
        '4xl':  '896px',
        '5xl':  '1024px',
        '6xl':  '1152px',
        '7xl':  '1280px',
        'full': '100%',
      },

      /* ── HEIGHT ── */
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
      },

      /* ── MIN HEIGHT ── */
      minHeight: {
        'screen':    '100vh',
        'screen-90': '90vh',
        '16':        '64px',
        '20':        '80px',
        '32':        '128px',
        '48':        '192px',
        '64':        '256px',
      },

      /* ── BACKGROUND IMAGE ── */
      backgroundImage: {
        'nature-gradient':  'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
        'hero-gradient':    'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
        'card-gradient':    'linear-gradient(135deg, #ffffff, #f9fdf9)',
        'green-radial':     'radial-gradient(ellipse at center, #4CAF50, #1B5E20)',
        'cream-gradient':   'linear-gradient(135deg, #FAF9F6, #F5F5DC)',
      },

      /* ── TRANSITION ── */
      transitionDuration: {
        '150':  '150ms',
        '200':  '200ms',
        '300':  '300ms',
        '400':  '400ms',
        '500':  '500ms',
        '700':  '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in':     'cubic-bezier(0.4, 0, 1, 1)',
        'out':    'cubic-bezier(0, 0, 0.2, 1)',
      },

      /* ── ANIMATION ── */
      animation: {
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'fade-in-up':   'fadeInUp 0.6s ease-out forwards',
        'slide-down':   'slideDown 0.3s ease-out forwards',
        'float':        'float 3s ease-in-out infinite',
        'pulse-green':  'pulseGreen 2s infinite',
        'spin-slow':    'spin 3s linear infinite',
        'bounce-slow':  'bounce 2s infinite',
        'shimmer':      'shimmer 1.5s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(76, 175, 80, 0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      /* ── Z-INDEX ── */
      zIndex: {
        '0':   '0',
        '10':  '10',
        '20':  '20',
        '30':  '30',
        '40':  '40',
        '50':  '50',
        '100': '100',
        '999': '999',
      },

      /* ── OPACITY ── */
      opacity: {
        '0':   '0',
        '5':   '0.05',
        '10':  '0.1',
        '15':  '0.15',
        '20':  '0.2',
        '25':  '0.25',
        '30':  '0.3',
        '40':  '0.4',
        '50':  '0.5',
        '60':  '0.6',
        '70':  '0.7',
        '75':  '0.75',
        '80':  '0.8',
        '85':  '0.85',
        '90':  '0.9',
        '95':  '0.95',
        '100': '1',
      },
    },
  },
  plugins: [],
}
