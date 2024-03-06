'use client';

import {
	HiPaperAirplane,
	HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {
	FieldValues,
	SubmitHandler,
	useForm
} from "react-hook-form";
import axios from "axios";
import {CldUploadButton} from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import {SyntheticEvent, useState} from "react";
import {MdOutlineGif, MdOutlineInsertEmoticon} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import {EmojiClickData} from "emoji-picker-react/src/types/exposedTypes";
import Modal from "@/app/components/modals/Modal";
import GifSelector from "@/app/conversations/[conversationId]/components/GifSelector";
import {IGif} from "@giphy/js-types";

const Form = () => {
	const {conversationId} = useConversation();
	const [emojiModalOpen, setEmojiModalOpen] = useState(false);
	const [gifModalOpen, setGifModalOpen] = useState(false);
	
	const {
		getValues,
		register,
		handleSubmit,
		setValue,
		formState: {
			errors,
		}
	} = useForm<FieldValues>({
		defaultValues: {
			message: ''
		}
	});
	
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('message', '', {shouldValidate: true});
		axios.post('/api/messages', {
			...data,
			conversationId: conversationId
		})
	}
	
	const handleUpload = (result: any) => {
		axios.post('/api/messages', {
			image: result.info.secure_url,
			conversationId: conversationId
		})
	}
	
	const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
		// Append the selected emoji to the message state
		setValue('message', `${getValues('message')} ${emojiData.emoji}`);
	};
	
	const onGifClick = (gif: IGif, event: SyntheticEvent<HTMLElement, Event>) => {
		console.log(gif, event)
		// axios.post('/api/messages', {
		// 	image: gi,
		// 	conversationId: conversationId
		// })
	}
	
	return (
		<div
			className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
		>
			<Modal isOpen={gifModalOpen} onClose={() => setGifModalOpen(false)}>
				<div className='w-96 h-96 overflow-y-auto'>
					<GifSelector
						onGifClick={onGifClick}
					/>
				</div>
			</Modal>
			<button
				className="cursor-pointer"
				onClick={() => setGifModalOpen(true)}
			>
				<MdOutlineGif
					size={30}
					className="text-sky-500"
				/>
			</button>
			
			<Modal isOpen={emojiModalOpen} onClose={() => setEmojiModalOpen(false)}>
				<div className='w-96 h-96'>
					<EmojiPicker
						height='100%'
						width='100%'
						open={emojiModalOpen}
						onEmojiClick={handleEmojiClick}
					/>
				</div>
			</Modal>
			<button
				className="cursor-pointer"
				onClick={() => setEmojiModalOpen(true)}
			>
				<MdOutlineInsertEmoticon
					size={30}
					className="text-sky-500"
				/>
			</button>
			
			
			<CldUploadButton
				options={{maxFiles: 1}}
				onUpload={handleUpload}
				uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			>
				<HiPhoto size={30} className="text-sky-500"/>
			</CldUploadButton>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2 lg:gap-4 w-full"
			>
				<MessageInput
					id="message"
					register={register}
					errors={errors}
					required
					placeholder="Write a message"
				/>
				<button
					type="submit"
					className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
				>
					<HiPaperAirplane
						size={18}
						className="text-white"
					/>
				</button>
			</form>
		</div>
	);
}

export default Form;