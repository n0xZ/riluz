import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import {
	errorMessagesForSchema,
	inputFromForm,
	makeDomainFunction,
} from 'domain-functions'
import { z } from 'zod'
import { FormField } from '~/components/form/FormField'
import {  register } from '~/utils/auth.server'
import { createUserSession, getSession } from '~/utils/session.server'

export const registerSchema = z.object({
	username: z.string().min(4, { message: 'Campo requerido' }),
	email: z
		.string()
		.min(4, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),

	password: z.string().min(4, { message: 'Campo requerido' }),
})

const registerFunc = makeDomainFunction(registerSchema)(
	async ({ email, password,username }) => {
		const registerResult = await register({ email, password,username })
		if (!registerResult) throw new Error('Credenciales incorrectas')
		return registerResult
	}
)
export const action = async ({ request }: ActionArgs) => {
	const result = await registerFunc(await inputFromForm(request))
	if (result.success) return createUserSession(result.data.id)

	const inputErrors = errorMessagesForSchema(result.inputErrors, registerSchema)
	return json(
		{
			email: inputErrors.email,
			password: inputErrors.password,
			externalErrors: result.errors,
		},
		{ status: result.success ? 200 : 400 }
	)
}
export const loader = async ({ request }: LoaderArgs) => {
	const session = await getSession(request)

	if (session.get('userId')) return redirect('/home')
	return null
}
export default function Register() {
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<Form
			ref={(e) => isSubmitting && e?.reset()}
			method="post"
			className="grid card-body place-items-center"
		>
			<FormField
				label="Correo electrónico"
				name="email"
				type="email"
				errors={actionData && actionData.email && actionData?.email[0]}
				data-test="email-input"
			/>
			<FormField
				label="Contraseña"
				name="password"
				type="password"
				errors={actionData && actionData.password && actionData?.password[0]}
				data-test="password-input"
			/>

			<button
				type="submit"
				className="btn btn-primary "
				disabled={isSubmitting}
				name="submit-login"
			>
				{!isSubmitting ? 'Crear cuenta' : 'Creando...'}
			</button>
			<Link to="/login">Ya tengo una cuenta</Link>
			<span className="text-red-500 h-9 ">
				{actionData &&
					actionData.externalErrors &&
					actionData.externalErrors[0].message}
			</span>
		</Form>
	)
}
