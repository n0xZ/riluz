import type { Message } from '@prisma/client'

import { prisma } from '~/utils/prisma.server'

export const getUserChatsByContactId = async (contactId: string) => {
	return prisma.chat.findMany({ where: { contact: { id: contactId } } })
}

export const addNewMessageToChat = async ({ content, id, userId }: Message) => {
	return prisma.chat.create({ data: {} })
}
