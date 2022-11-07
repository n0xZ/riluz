import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Bienvenido a Riluz!',
	viewport: 'width=device-width,initial-scale=1',
})
export const links: LinksFunction = () => [
	{ href: styles, rel: 'stylesheet' },
	{
		href:
			'https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Lexend+Deca:wght@300&display=swap',
		rel: 'stylesheet',
	},
]

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="text-neutral-900 bg-gradient-to-r from-violet-100 to-fuchsia-100 font-gowun">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
