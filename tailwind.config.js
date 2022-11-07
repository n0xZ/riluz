/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/*.tsx', './app/routes/**/*.tsx', './app/components/**/*.tsx'],
	theme: {
		extend: { fontFamily: { karla: ['Karla'] } },
	},
	plugins: [],
}
