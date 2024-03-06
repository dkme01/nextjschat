'use client'

import {FullMessageType} from "@/app/types";
import {FC, useEffect, useRef, useState} from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";

interface BodyProps {
	initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({initialMessages}: BodyProps) => {
	const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);
	
	const {conversationId} = useConversation();
	
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`)
	}, [conversationId]);
	
	return (
		<div className='flex-1 overflow-y-auto'>
			{messages.map((message, index) => (
				<MessageBox
					isLast={index === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			
			<div ref={bottomRef} className='pt-24'/>
		</div>
	);
};

export default Body;