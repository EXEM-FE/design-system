/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './page/**/*.{ts,tsx}',
    './component/**/*.{ts,tsx}',
    './apps/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '640px',
      wide: '1600px',
      // md: tokens.breakpoint.md,
      // lg: tokens.breakpoint.lg,
      // xl: tokens.breakpoint.xl,
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        foreground: 'hsl(var(--foreground))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
      },

      borderRadius: {
        // ...tokens.radius,
      },
      boxShadow: {
        //...tokens.shadow,
        'table-pinned-left': '0px 0px 20px 0px rgba(3, 7, 18, 0.12)',
        'table-pinned-right': '-0px 0px 20px 0px rgba(3, 7, 18, 0.12)',
        /* Shadow/Medium */
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        marquee2: 'marquee2 20s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      fontSize: {
        'header-1': ['28px', { lineHeight: '140%' }],
        'header-2': ['24px', { lineHeight: '140%' }],
        'title-1': ['20px', { lineHeight: '140%' }],
        'title-2': ['18px', { lineHeight: '140%' }],
        'body-1': ['16px', { lineHeight: '140%' }],
        'body-2': ['14px', { lineHeight: '140%' }],
        'body-3': ['12px', { lineHeight: '140%' }],
        caption: ['11px', { lineHeight: '140%' }],
      },
    },
  },
  // plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
