/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // System Colors
        background: '#F7F6F3', // Off-white
        foreground: '#111111', // Primary text
        accent: '#8B0000', // Deep red
        
        // Status Colors (Muted)
        success: '#557A66',    // Muted Green
        warning: '#B89C56',    // Muted Amber
        border: '#E0E0E0',     // Subtle border
      },
      fontFamily: {
        // Premium Typography
        serif: ['"Lora"', 'serif'], // Confident headings
        sans: ['"Inter"', 'sans-serif'], // Clean body
      },
      spacing: {
        // Strict Spacing Scale
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
        '16': '64px',
      },
      maxWidth: {
        'reading': '720px', // Optimal reading width
      },
      transitionDuration: {
        'DEFAULT': '200ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)', // Ease-in-out
      }
    },
  },
  plugins: [],
}
