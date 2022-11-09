/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/*.tsx', './app/routes/**/*.tsx', './app/components/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				figtree: ['Figtree', 'cursive'],
				telex: ['Telex', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
