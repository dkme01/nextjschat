'use client'

import {FC, useEffect, useMemo, useState} from 'react';
import {FullConversationType} from "@/app/types";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import {User} from "@prisma/client";
import {useSession} from "next-auth/react";
import {pusherClient} from "@/app/libs/pusher";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import {find} from 'lodash';

interface ConversationListProps {
	initialItems: FullConversationType[];
	users: User[];
}

const ConversationList: FC<ConversationListProps> = (
	{initialItems, users}
) => {
	const [items, setItems] = useState<FullConversationType[]>(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const router = useRouter();
	const session = useSession();
	
	const {conversationId, isOpen} = useConversation();
	
	const pusherKey = useMemo(() => {
		return session.data?.user?.email
	}, [session.data?.user?.email])
	
	useEffect(() => {
		if (!pusherKey) {
			return;
		}
		
		pusherClient.subscribe(pusherKey);
		
		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) => current.map((currentConversation) => {
				if (currentConversation.id === conversation.id) {
					return {
						...currentConversation,
						messages: conversation.messages
					};
				}
				
				return currentConversation;
			}));
		}
		
		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, {id: conversation.id})) {
					return current;
				}
				
				return [conversation, ...current]
			});
		}
		
		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [...current.filter((group) => group.id !== conversation.id)]
			});
		}
		
		pusherClient.bind('conversation:update', updateHandler)
		pusherClient.bind('conversation:new', newHandler)
		pusherClient.bind('conversation:remove', removeHandler)
	}, [pusherKey, router]);
	
	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<aside
				className={clsx(`
				fixed
				inset-y-0
				pb-20
				lg:pb-0
				lg:left-20
				lg:w-80
				lg:block
				overflow-y-auto
				border-r
				border-gray-200
			`,
					isOpen ? 'hidden' : 'block w-full left-0',
				)}
			>
				<div className="px-5">
					<div className="flex justify-between mb-4 pt-4">
						<div
							className='
							text-2xl
							font-bold
							text-neutral-800
						'
						>
							Messages
						</div>
						<div
							onClick={() => setIsModalOpen(true)}
							className='
							rounded-full
							p-2
							bg-gray-100
							text-gray-600
							cursor-pointer
							hover:opacity-75
							transition
						'
						>
							<MdOutlineGroupAdd/>
						</div>
					</div>
					{items.map((conversation) => (
						<ConversationBox
							key={conversation.id}
							data={conversation}
							selected={conversationId === conversation.id}
						/>
					))}
				</div>
			</aside>
		</>
	);
};

export default ConversationList;