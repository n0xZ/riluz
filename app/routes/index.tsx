import { NavLink } from '@remix-run/react'

export default function Index() {
	return (
		<>
			<header className="p-5 ">
				<nav className="container flex flex-row items-center justify-between max-w-5xl mx-auto ">
					<h1>
						<NavLink to="/">Home</NavLink>
					</h1>
					<ul className="flex flex-row items-center space-x-5">
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink
								to="/register"
								className="px-5 py-4 bg-indigo-500 rounded-md text-gray-50 "
							>
								Unete ya
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-screen">
				<section className="grid h-full place-items-center">
					<h1>Crea tus notas, y habla con tus amigos devs en Riluz</h1>
				</section>
			</main>
		</>
	)
}
