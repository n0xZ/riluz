import type { Note } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export const getNotesByAuthorId = async (authorId: string) => {
	return await prisma.note.findMany({ where: { authorId } })
}

export const getNoteByNoteId = async (noteId?: string) => {
	return await prisma.note.findUnique({ where: { id: noteId } })
}

export const createNote = async ({ title, content, authorId }: Note) => {
	return await prisma.note.create({
		data: {
			title,
			content,
			author: { connect: { id: authorId } },
		},
	})
}
export const deleteNote = async (noteId: string) => {
	return await prisma.note.delete({ where: { id: noteId } })
}
export const updateNote = async ({ title, content, id }: Partial<Note>) => {
	return prisma.note.update({ data: { title, content }, where: { id } })
}
