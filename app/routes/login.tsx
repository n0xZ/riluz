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
import { login } from '~/utils/auth.server'
import { createUserSession, getSession } from '~/utils/session.server'

export const loginSchema = z.object({
	email: z
		.string()
		.min(4, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(4, { message: 'Campo requerido' }),
})

const loginFunc = makeDomainFunction(loginSchema)(
	async ({ email, password }) => {
		const loginResult = await login({ email, password })
		if (!loginResult) throw new Error('Credenciales incorrectas')
		return loginResult
	}
)

export const action = async ({ request }: ActionArgs) => {
	const result = await loginFunc(await inputFromForm(request))
	if (result.success) return createUserSession(result.data.id)

	const inputErrors = errorMessagesForSchema(result.inputErrors, loginSchema)
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
export default function Login() {
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<main className="grid h-screen place-items-center">
			<Form
				action="/login"
				ref={(e) => isSubmitting && e?.reset()}
				method="post"
				className="container flex flex-col justify-center max-w-3xl p-2 mx-auto space-y-3 xl:p-0"
			>
				<h1 className="text-lg font-bold text-center xl:text-2xl">
					Inicia sesión en Riluz!
				</h1>
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
					className={`max-w-3xl px-5 py-3 font-bold rounded-lg bg-fuchsia-600 text-gray-50 ${
						isSubmitting && 'flex flex-row items-center justify-center space-x-3'
					}`}
					disabled={isSubmitting}
					name="submit-login"
				>
					{!isSubmitting ? (
						'Iniciar sesión'
					) : (
						<>
							<LoadingIcon />
							<span>Iniciando...</span>
						</>
					)}
				</button>
				<Link to="/register" className="mt-6 text-center">
					No tengo una cuenta
				</Link>
				<span className="text-red-500 h-9 ">
					{actionData &&
						actionData.externalErrors.length !== 0 &&
						actionData.externalErrors[0].message}
				</span>
			</Form>
		</main>
	)
}
