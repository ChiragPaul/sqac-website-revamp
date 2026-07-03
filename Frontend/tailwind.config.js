export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep purple and black gradient theme from screenshot
        dark: {
          primary: '#0a0014',      // Deep black-purple for backgrounds
          secondary: '#1a0033',    // Dark purple
          tertiary: '#2d1b69',     // Medium purple
          accent: '#7c3aed',       // Purple accent for buttons
          accentSecondary: '#a855f7', // Lighter purple accent
          accentBright: '#c084fc', // Bright purple for highlights
          text: {
            primary: '#ffffff',     // Main text color
            secondary: '#e5e5e5',   // Secondary text
            tertiary: '#a3a3a3',   // Muted text
            inverse: '#000000',    // Inverse text for dark backgrounds
          },
          border: '#374151',       // Subtle borders
          surface: '#1f2937',      // Card/component backgrounds
          elevated: '#374151',     // Elevated surfaces
          overlay: 'rgba(0, 0, 0, 0.8)', // Overlay backgrounds
        },
        // Keep existing colors for compatibility
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        logo: ['"Montserrat"', 'sans-serif'],
        bubble: ['"Stick No Bills"', 'sans-serif'],
        head: ['"Poppins"', 'sans-serif'],
        domains: ['"Protest Riot"', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'purple-card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'purple-elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'glow-blink': 'glowBlink 2s infinite ease-in-out',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #0a0014 0%, #1a0033 25%, #2d1b69 50%, #1a0033 75%, #0a0014 100%)',
        'purple-radial': 'radial-gradient(circle at center, #2d1b69 0%, #1a0033 50%, #0a0014 100%)',
      },
    },
  },
  plugins: [],
}
