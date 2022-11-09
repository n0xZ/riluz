import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import { getNoteByNoteId } from '~/models/note.server'

export const loader = async ({ params }: LoaderArgs) => {
	const note = await getNoteByNoteId(params.id)
	return json({ content: note?.content, title: note?.title })
}

export const meta: MetaFunction = ({ data }) => ({
	title: `Riluz - ${data.title}`,
})
export default function NoteById() {
	const note = useLoaderData<typeof loader>()
	return (
		<div className="container flex flex-col items-center w-full h-full mx-auto prose">
			<div dangerouslySetInnerHTML={{ __html: marked(note.content!) }}></div>
		</div>
	)
}
