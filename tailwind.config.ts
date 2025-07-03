import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        brand: {
          '100': '#A084E8', // lighter purple
          DEFAULT: '#6C47B6' // main purple
        },
        red: '#C084FC', // purple-pink for error
        error: '#A83279', // deep magenta
        green: '#7F6EDB', // purple-green (muted)
        blue: '#8F6EDB', // purple-blue
        pink: '#C084FC', // purple-pink
        orange: '#B983FF', // purple-orange
        light: {
          '100': '#3D246C', // deep purple for text
          '200': '#A084E8', // light purple
          '300': '#E0C3FC', // very light purple
          '400': '#F3E8FF' // pale purple
        },
        dark: {
          '100': '#2D1B4A', // darkest purple
          '200': '#3D246C' // deep purple
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': '#A084E8',
          '2': '#6C47B6',
          '3': '#3D246C',
          '4': '#B983FF',
          '5': '#E0C3FC'
        }
      },
  		fontFamily: {
  			poppins: ["var(--font-poppins)"]
  		},
  		boxShadow: {
  			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
  			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
  			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
