import { Link, Outlet } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getNotesByAuthorId } from '~/models/note.server'
import { requireUserId } from '~/utils/session.server'

interface NoteListProps {
	notes: ReturnType<typeof useLoaderData<typeof loader>>
}

export const loader = async ({ request }: LoaderArgs) => {
	const loggedUserId = await requireUserId(request)
	return getNotesByAuthorId(loggedUserId)
}

function AddNoteIcon({className}:{className?:string}) {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
			className={className}
		>
			<path fill="none" d="M0 0h24v24H0z"></path>
			<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z"></path>
		</svg>
	)
}
function NoteList({ notes }: NoteListProps) {
	return (
		<article className="flex flex-col justify-center gap-4 ">
			{notes?.map((note) => (
				<aside
					className="flex flex-col justify-center border-t-2 border-b-2 h-30 border-neutral-50"
					key={note.id}
				>
					<Link
						to={`/home/notes/${note.id}`}
						className="p-3 duration-100 ease-in-out hover:text-fuchsia-300 hover:font-medium"
					>
						<h3>{note.title}</h3>
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
					<span className="flex flex-row items-center justify-center w-full mx-4 mt-5 space-x-10 mb-7 ">
						<h1 className="text-lg font-bold text-center ">Mis notas</h1>
						<Link to="/home/notes/create" className="text-lg font-bold text-center ">
							<AddNoteIcon  className='duration-100 ease-in-out w-7 h-7 hover:text-fuchsia-300' />
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
