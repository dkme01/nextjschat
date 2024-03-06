import prisma from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {conversationId},
			include: {
				sender: true,
				seen: true
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		
		return messages;
	} catch (e) {
		return []
	}
}

export default getMessages;