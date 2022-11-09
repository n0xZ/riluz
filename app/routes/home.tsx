import { Form, NavLink, Outlet } from '@remix-run/react'
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
function NoteIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1024 1024"
			height="1em"
			width="1em"
		>
			<path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM668 345.9L621.5 312 572 347.4V124h96v221.9z"></path>
		</svg>
	)
}

function HomeIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1024 1024"
			height="1em"
			width="1em"
		>
			<path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
		</svg>
	)
}
function LogoutIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
		>
			<path d="M18 2H6a1 1 0 00-1 1v9l5-4v3h6v2h-6v3l-5-4v9a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1z"></path>
		</svg>
	)
}
function ContactIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
		>
			<path fill="none" d="M0 0h24v24H0z"></path>
			<path d="M19 7h5v2h-5V7zm-2 5h7v2h-7v-2zm3 5h4v2h-4v-2zM2 22a8 8 0 1116 0h-2a6 6 0 10-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
		</svg>
	)
}

function HomeNavMenu() {
	return (
		<Menu
			as="div"
			className="relative inline-block text-left xl:hidden lg:hidden"
		>
			<div>
				<Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-fuchsia-900 bg-opacity-60 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
								to="/home/notes"
								className="flex items-center w-full px-2 py-2 space-x-2 text-sm duration-100 ease-in-out rounded-md group text-neutral-900 hover:bg-fuchsia-400 hover:text-neutral-100"
							>
								<NoteIcon />
								<span>Notas</span>
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink
								to="/home/contacts"
								className="flex items-center w-full px-2 py-2 space-x-2 text-sm duration-100 ease-in-out rounded-md group text-neutral-900 hover:bg-fuchsia-400 hover:text-neutral-100"
							>
								<ContactIcon />
								<span>Contactos</span>
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<Form action="/logout" method="post">
								<button
									type="submit"
									className="flex items-center w-full px-2 py-2 space-x-2 text-sm duration-100 ease-in-out rounded-md group text-neutral-900 hover:bg-fuchsia-400 hover:text-neutral-100"
								>
									<LogoutIcon /> <span>Cerrar sesión</span>
								</button>
							</Form>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default function HomeOutlet() {
	return (
		<>
			<header className="p-5 border-b-2 border-neutral-50">
				<nav className="container flex flex-row items-center justify-between max-w-5xl mx-auto text-lg font-medium ">
					<h1>
						<NavLink
							to="/home"
							className="flex flex-row items-center space-x-3 font-medium"
						>
							<HomeIcon />
							<span>Home</span>
						</NavLink>
					</h1>
					<ul className="flex-row items-center hidden space-x-5 font-medium xl:flex lg:flex ">
						<li>
							<NavLink
								to="/home/notes"
								className="flex items-center w-full px-2 py-2 duration-100 ease-in-out rounded-md hover:font-medium hover:bg-gray-100 group text-neutral-900"
							>
								<NoteIcon />
								<span>Notas</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/home/contacts"
								className="flex items-center w-full px-2 py-2 space-x-3 duration-100 ease-in-out rounded-md hover:font-medium hover:bg-gray-100 group text-neutral-900"
							>
								<ContactIcon />
								<span>Contactos</span>
							</NavLink>
						</li>
						<li>
							<Form action="/logout" method="post">
								<button
									type="submit"
									className="flex flex-row items-center px-5 py-3 space-x-3 duration-100 ease-in-out rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-gray-50"
								>
									<LogoutIcon />
									<span>Cerrar sesión</span>
								</button>
							</Form>
						</li>
					</ul>
					<HomeNavMenu />
				</nav>
			</header>
			<main className="h-screen ">
				<Outlet />
			</main>
		</>
	)
}
