import prisma from '@/app/libs/prismadb';

import {getSession} from "next-auth/react";
import {User} from "next-auth";

const getCurrentUser = async () => {
	try {
		const session = await getSession();
		
		if (!session?.user?.email) {
			return null;
		}
		
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string
			}
		})
		
		if(!currentUser) {
			return null;
		}
		
		return currentUser
		
	} catch (error: any) {
		return null;
	}
}

export default getCurrentUser;