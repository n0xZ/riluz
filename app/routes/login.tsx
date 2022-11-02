import type { ActionArgs } from '@remix-run/node'
import { z } from 'zod'

const loginSchema = z.object({
	email: z
		.string()
		.min(4, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(4, { message: 'Campo requerido' }),
})

export const action = async ({ request }: ActionArgs) => {}


export default function Login() {
	return <main>
  
  
  </main>
}
