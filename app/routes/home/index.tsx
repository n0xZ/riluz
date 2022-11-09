import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '~/utils/session.server'

export const loader = async ({ request }: LoaderArgs) => {
	const loggedUser = await requireUser(request)
	return json({ username: loggedUser?.username })
}
export default function Home() {
	const user = useLoaderData<typeof loader>()

	return (
		<section className="container flex flex-col items-center justify-center h-full mx-auto space-y-3">
			<p>Bienvenido, {user.username}</p>
			<p>Que desea realizar hoy?</p>
		</section>
	)
}
