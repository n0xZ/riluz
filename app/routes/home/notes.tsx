import { Link, Outlet } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getNotesByAuthorId } from '~/models/note.server'
import { requireUserId } from '~/utils/session.server'

export const loader = async ({ request }: LoaderArgs) => {
	const loggedUserId = await requireUserId(request)
	return getNotesByAuthorId(loggedUserId)
}

interface NoteListProps {
	notes: ReturnType<typeof useLoaderData<typeof loader>>
}

function NoteList({ notes }: NoteListProps) {
	return (
		<article className="container grid grid-rows-2 gap-4 p-2 mx-auto">
			{notes?.map((note) => (
				<aside
					className="flex flex-col justify-center p-3 border-b-2 h-30 border-neutral-50"
					key={note.id}
				>
					<Link
						to={`/home/notes/${note.id}`}
						className="duration-100 ease-in-out hover:text-fuchsia-600"
					>
						<h2>{note.title}</h2>
					</Link>
				</aside>
			))}
		</article>
	)
}
export default function NotesOutlet() {
	const notes = useLoaderData<typeof loader>()
	return (
		<>
			<section className="hidden w-full h-full xl:flex xl:flex-row lg:flex md:flex ">
				<div className="h-full border-r-2 rounded shadow-sm w-96 border-neutral-50">
					<span className="flex flex-row items-center justify-center mx-4 mt-2 space-x-10">
						<h1 className="text-lg font-bold text-center ">Mis notas</h1>
						<Link
							to="/home/notes/create"
							className="text-lg font-bold text-center "
						>
							Agregar nota
						</Link>
					</span>

					<NoteList notes={notes} />
				</div>
				<article className="w-full h-full">
					<Outlet />
				</article>
			</section>
			<section className="relative h-full min-h-screen p-3 xl:hidden lg:hidden ">
				<Outlet />
			</section>
		</>
	)
}
