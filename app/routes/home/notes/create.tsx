import { Form, useActionData, useTransition } from '@remix-run/react'
import { z } from 'zod'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import {
	errorMessagesForSchema,
	inputFromForm,
	makeDomainFunction,
} from 'domain-functions'
import { createNote } from '~/models/note.server'
import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { requireUserId } from '~/utils/session.server'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
	name: string
	errors?: string
}
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	type: string
	name: string
	errors?: string
}
const createNoteSchema = z.object({
	title: z.string().min(3, { message: 'Campo requerido' }),
	content: z
		.string()
		.min(10, { message: 'Este campo requiere de 10 carácteres' }),
})

export const action = async ({ request }: ActionArgs) => {
	const userId = await requireUserId(request)
	console.log(userId)
	const createNoteFunc = makeDomainFunction(createNoteSchema)(
		async ({ content, title }) => {
			return createNote({ title, content, authorId: userId })
		}
	)
	const result = await createNoteFunc(await inputFromForm(request))
	console.log(result)
	const inputErrors = errorMessagesForSchema(
		result.inputErrors,
		createNoteSchema
	)
	return json(
		{
			title: inputErrors.title,
			content: inputErrors.content,
			isSuccessful: result.success,
		},
		{ status: result.success ? 200 : 400 }
	)
}
export const TextAreaField = ({
	label,
	name,
	errors,
	...rest
}: TextAreaProps) => {
	return (
		<aside className="flex flex-col justify-center w-full space-y-3">
			<label className="font-bold ">{label}</label>
			<textarea
				name={name}
				placeholder="El contenido de tu nota a completar"
				{...rest}
				className="w-full border-2 outline-none h-96 border-neutral-100"
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
	)
}
function FormField({ label, name, type, errors, ...rest }: FormFieldProps) {
	return (
		<aside className="flex flex-col justify-center space-y-3">
			<label className="font-bold ">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full px-5 py-3 bg-transparent border-2 rounded-lg outline-none border-neutral-100"
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
	)
}

function LoadingIcon() {
	return (
		<svg
			fill="currentColor"
			strokeWidth="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
		>
			<circle cx="12" cy="20" r="2"></circle>
			<circle cx="12" cy="4" r="2"></circle>
			<circle cx="6.343" cy="17.657" r="2"></circle>
			<circle cx="17.657" cy="6.343" r="2"></circle>
			<circle cx="4" cy="12" r="2.001"></circle>
			<circle cx="20" cy="12" r="2"></circle>
			<circle cx="6.343" cy="6.344" r="2"></circle>
			<circle cx="17.657" cy="17.658" r="2"></circle>
		</svg>
	)
}
export default function CreateNote() {
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<Form
			method="post"
			className="flex flex-col justify-center w-full p-4 space-y-"
		>
			<h1 className="mb-3 text-3xl font-bold text-center">Crear nueva nota</h1>
			<FormField
				name="title"
				type="text"
				label="Titulo de la nota"
				errors={actionData && actionData.title && actionData?.title[0]}
			/>
			<TextAreaField
				name="content"
				placeholder="El contenido de mi nota"
				label="Contenido de la nota"
				errors={actionData && actionData.content && actionData?.content[0]}
			/>
			<button
				type="submit"
				className={`w-full px-5 py-3 font-bold rounded-lg bg-fuchsia-600 text-gray-50 ${
					isSubmitting && 'flex flex-row items-center justify-center space-x-3'
				}`}
				disabled={isSubmitting}
				name="submit-login"
			>
				{!isSubmitting ? (
					'Crear nota'
				) : (
					<>
						<LoadingIcon />
						<span>Creando...</span>
					</>
				)}
			</button>
		</Form>
	)
}
