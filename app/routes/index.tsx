import { Link, NavLink } from '@remix-run/react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function MenuIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1024 1024"
			height="1em"
			width="1em"
		>
			<path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
		</svg>
	)
}
function NavMenu() {
	return (
		<Menu
			as="div"
			className="relative inline-block text-left xl:hidden lg:hidden"
		>
			<div>
				<Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-zinc-900 bg-opacity-60 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<MenuIcon />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							<NavLink
								to="/login"
								className="flex items-center w-full px-2 py-2 text-sm rounded-md group text-neutral-900"
							>
								Iniciar sesión
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink
								to="/register"
								className="flex items-center w-full px-2 py-2 text-sm text-white rounded-md bg-fuchsia-600 group"
							>
								Unete ya!
							</NavLink>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
export default function Index() {
	return (
		<>
			<header className="p-5">
				<nav className="container flex flex-row items-center justify-between max-w-5xl mx-auto text-xl text-gray-600 font-telex">
					<h1>
						<NavLink
							to="/"
							className="font-bold duration-100 ease-in-out hover:text-fuchsia-400 "
						>
							Riluz
						</NavLink>
					</h1>
					<ul className="flex-row items-center hidden space-x-5 font-medium xl:flex lg:flex">
						<li>
							<NavLink
								to="/login"
								className="duration-100 ease-in-out hover:text-fuchsia-400"
							>
								Iniciar sesión
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/register"
								className="px-6 py-3 duration-100 ease-in-out rounded-md bg-fuchsia-500 hover:bg-fuchsia-600 text-gray-50"
							>
								Unete ya
							</NavLink>
						</li>
					</ul>
					<NavMenu />
				</nav>
			</header>
			<main className="h-screen">
				<section className="container flex flex-col items-center justify-center h-full max-w-3xl mx-auto space-y-4">
					<h1 className="p-2 text-5xl font-semibold tracking-normal text-center xl:text-6xl">
						Crear tus notas y conectarte con tus
						<span className="text-fuchsia-400"> amigos devs</span> nunca fue tan fácil
					</h1>
					<p className="text-xl text-center text-neutral-400">
						Con Riluz, podrás contactarte con tus amigos devs de todo el país, y a la
						vez, podrás crear tus apuntes personales.
					</p>
					<Link
						to="/login"
						className="px-6 py-3 font-semibold duration-100 ease-in-out rounded-md bg-fuchsia-500 hover:bg-fuchsia-600 text-gray-50"
					>
						Comenzar ya
					</Link>
				</section>
			</main>
		</>
	)
}
