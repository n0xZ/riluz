import type { ActionArgs } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'
import { z } from 'zod'
import { login } from '~/utils/auth.server'

export const loginSchema = z.object({
	email: z
		.string()
		.min(4, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(4, { message: 'Campo requerido' }),
})

const loginFunc = makeDomainFunction(loginSchema)(
	async ({ email, password }) => {
		const result = await login({ email, password })
		if(!result) throw new Error('')
	}
)
export const action = async ({ request }: ActionArgs) => {}

export default function Login() {
	return <main></main>
}
