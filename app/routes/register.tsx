import { z } from 'zod'

export const registerSchema = z.object({
	username: z.string().min(4, { message: 'Campo requerido' }),
	email: z
		.string()
		.min(4, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),

	password: z.string().min(4, { message: 'Campo requerido' }),
})

export default function Register() {
	return <div>Register</div>
}
