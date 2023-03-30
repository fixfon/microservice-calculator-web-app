/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'dark-bg': '#020617',
				'light-bg': '#F1F2F3',
				'btn-number': '#2E2F38',
				'btn-func': '#4B5EFC',
				'btn-menu': '#D2D3DA',
				'dark-btn-menu': '#4E505F',
			},
		},
	},
	plugins: [],
};
