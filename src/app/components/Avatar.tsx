'use client';

import React, {FC} from 'react';
import {User} from "next-auth";
import Image from "next/image";

interface AvatarProps {
	user?: User;
}

const Avatar: FC<AvatarProps> = ({user}) => {
	return (
		<div className='relative'>
			<div
				className="
					relative
					inline-block
					rounded-full
					overflow-hidden
					h-9
					w-9
					md:h-11
					md:w-11
				"
			>
				<Image src={user?.image || '/images/placeholder.jpg'} width={150} height={150} alt='Avatar'/>
			</div>
		<span
			className='
				absolute
				block
				rounded-full
				bg-green-500
				ring-2
				ring-white
				top-0
				right-0
				h-2
				w-2
				md:h-3
				md:w-3
			'
		/>
		</div>
	);
};

export default Avatar;