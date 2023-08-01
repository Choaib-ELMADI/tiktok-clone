/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		screens: {
			xxs: "281px",
			xs: "501px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				brand_1: "var(--brand_1)",
				brand_2: "var(--brand_2)",
				brand_1_trs: "var(--brand_1_trs)",
				brand_2_trs: "var(--brand_2_trs)",

				background: "var(--background)",
				text: "var(--text)",
				secondary: "var(--secondary)",

				black: "var(--black)",
				white: "var(--white)",
				white_trs: "var(--white_trs)",
				light_white: "var(--light_white)",
				gray: "var(--gray)",
				light_gray: "var(--light_gray)",
				dark_gray: "var(--dark_gray)",
				gray_trs: "var(--gray_trs)",

				radius: "var(--radius)",
				border: "var(--border)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
