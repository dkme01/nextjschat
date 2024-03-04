'use client';
import React, {useCallback, useState} from 'react';
import {FieldValues, useForm, SubmitHandler} from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/components/AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>('LOGIN');
	const [isLoading, setIsLoading] = useState(false);
	
	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER');
		} else {
			setVariant('LOGIN');
		}
	}, [variant]);
	
	const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	});
	
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		
		if (variant === 'REGISTER') {
			// Axios Register
		}
		
		if (variant === 'LOGIN') {
			// NextAuth SignIn
		}
	}
	
	const socialAction = (action: String) => {
		setIsLoading(true);
		
		// NextAuth Social Sign
	}
	
	return (
		<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
			<div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
				<form
					className='space-y-6'
					onSubmit={handleSubmit(onSubmit)}
				>
					{variant === "REGISTER" ?
						<Input label='Full Name' register={register} id='name' type='text' errors={errors}/>
						: <></>}
					<Input label='Email address' register={register} id='email' type='email' errors={errors}/>
					<Input label='Password' register={register} id='password' type='password' errors={errors}/>
					{variant === "REGISTER" ?
						<Input
							label='Confirm Password'
							register={register}
							id='confirm-password'
							type='password'
							errors={errors}
						/>
						: <></>}
					<Button disabled={isLoading} fullWidth
					        type='submit'>{variant === "REGISTER" ? "Register" : "Sign in"}</Button>
				</form>
				
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"/>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					
					<div className="mt-6 flex gap-2">
						<AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
						<AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
					</div>
				</div>
				
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div>{variant === "REGISTER" ? "Already have an account?" : "New to Chat App?"}</div>
					<div onClick={toggleVariant} className='underline cursor-pointer'>
						{variant === "REGISTER" ? "Log in" : "Create an account"}
					</div>
				</div>
			
			</div>
		</div>
	);
};

export default AuthForm;