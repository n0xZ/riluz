import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { prisma } from './prisma.server'

const SESSION_SECRET = process.env.SESSION_SECRET!
export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'USER_SESSION',
		path: '/',
		secrets: [SESSION_SECRET],
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
		sameSite: 'lax',
	},
})

export async function getSession(request: Request) {
	const cookie = request.headers.get('Cookie')
	return sessionStorage.getSession(cookie)
}

export async function getUserId(request: Request): Promise<string | undefined> {
	const session = await getSession(request)
	const userId = session.get('userId')
	return userId
}

export async function createUserSession(userId: string) {
	const session = await sessionStorage.getSession()
	session.set('userId', userId)
	return redirect('/home', {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	})
}

export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) {
	const userId = await getUserId(request)
	if (!userId) {
		const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
		throw redirect(`/login?${searchParams}`)
	}
	return userId
}
export async function requireUser(request: Request) {
	const loggedUserId = await requireUserId(request)
	const loggedUser = await prisma.user.findUnique({
		where: { id: loggedUserId },
	})

	return loggedUser
}
export async function logout(request: Request) {
	const session = await getSession(request)
	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	})
}
