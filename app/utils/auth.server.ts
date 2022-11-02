import type { z } from 'zod'
import bcryptjs from 'bcryptjs'
import type { loginSchema } from '~/routes/login'
import { prisma } from './prisma.server'
import type { registerSchema } from '~/routes/register'

export const login = async ({
	email,
	password,
}: z.infer<typeof loginSchema>) => {
	const existingUser = await prisma.user.findUnique({ where: { email } })
	if (!existingUser) return
	const passwordMatches = await bcryptjs.compare(password, existingUser.password)
	if (!passwordMatches) return
	return {
		id: existingUser.id,
	}
}

export const register = async ({
	email,
	username,
	password,
}: z.infer<typeof registerSchema>) => {
	const SALT_ROUNDS = process.env.SALT_ROUNDS!
	const existingUser = await prisma.user.findUnique({ where: { email } })
	if (existingUser) return
	const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS)
	const createdUser = await prisma.user.create({
		data: { email, password: hashedPassword, username },
	})
	return {
		id: createdUser.id,
	}
}
