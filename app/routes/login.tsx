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

export default function Login() {
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<main className="grid h-screen place-items-center">
			<Form
				ref={(e) => isSubmitting && e?.reset()}
				method="post"
				className="container flex flex-col justify-center max-w-3xl p-2 mx-auto xl:p-0"
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
					className="px-5 py-3 rounded-lg bg-fuchsia-600 "
					disabled={isSubmitting}
					name="submit-login"
				>
					{!isSubmitting ? 'Iniciar sesión' : 'Iniciando...'}
				</button>
				<Link to="/register" className="mt-6 text-center">No tengo una cuenta</Link>
				<span className="text-red-500 h-9 ">
					{actionData &&
						actionData.externalErrors.length !== 0 &&
						actionData.externalErrors[0].message}
				</span>
			</Form>
		</main>
	)
}
