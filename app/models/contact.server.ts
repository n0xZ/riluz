import type { Contact, Status } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export const getUserContactsByUserId = async (id: string) => {
	return await prisma.contact.findMany({ where: { actor: { id } } })
}

export const getUserContactById = async (id: string) => {
	return await prisma.user.findUnique({ where: { id } })
}
export const createUserContactInvitation = async ({
	actorId,
	id,
	invitedUserId,
}: Contact) => {
	return await prisma.contact.create({
		data: { invitedUserId, status: 'PENDING', actorId, id },
	})
}

export const deleteUserContactById = async (id: string) => {
	return prisma.contact.delete({ where: { id } })
}
export const updateUserContact = async (id: string, status: Status) => {
	return await prisma.contact.update({ data: { status }, where: { id } })
}
