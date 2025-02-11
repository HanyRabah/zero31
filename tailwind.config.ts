/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			yellow: '#FAFF00',
    			primary: {
    				DEFAULT: '#FAFF00',
    				hover: '#010101'
    			},
    			secondary: {
    				DEFAULT: '#E1EEF7',
    				hover: '#FAFF00'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			'novo-blue': '#E9F2F9',
    			'blue-black': '#2B3334',
    			'off-white': '#F6F5F5',
    			'light-blue': '#E1EEF7'
    		},
    		spacing: {
    			'0': '0px',
    			'1': '1px',
    			'2': '2px',
    			'3': '3px',
    			'5': '5px',
    			'4': '4px',
    			'8': '8px',
    			'12': '12px',
    			'16': '16px',
    			'20': '20px',
    			'24': '24px',
    			'32': '32px',
    			'40': '40px',
    			'48': '48px',
    			'50': '50px',
    			'56': '56px',
    			'60': '60px',
    			'64': '64px',
    			'72': '72px',
    			'80': '80px',
    			'96': '96px',
    			'100': '100px',
    			'120': '120px',
    			'160': '160px',
    			'200': '200px',
    			'240': '240px',
    			'280': '280px',
    			'320': '320px',
    			'360': '360px',
    			'400': '400px',
    			'480': '480px',
    			'560': '560px',
    			'640': '640px',
    			'720': '720px',
    			'800': '800px',
    			'960': '960px',
    			'1024': '1024px',
    			'1280': '1280px',
    			'1440': '1440px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		fontFamily: {
    			title: [
    				'var(--font-inter)'
    			],
    			sans: [
    				'var(--font-inter)'
    			],
    			special: [
    				'var(--font-neue-haas)'
    			],
    			mono: [
    				'var(--font-dm-mono)'
    			]
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
