import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth-context';
import useHttpCall from '../hooks/http-hook';
import Input from './Input';

import './Signup.css';

export default function Login() {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const { sendHttpReq } = useHttpCall();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm();

	const onSubmit = async data => {
		try {
			const res = await sendHttpReq({
				url: `/api/users/login`,
				method: 'POST',
				data
			});
			auth.login(res.userId, res.userName, res.token);
			history.push('/');
		} catch (err) {
			setError(err.errorType, {
				type: 'manual',
				message: err.message
			});
		}
	};

	return (
		<div className='form-signin mt-5'>
			<form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
				<h1
					className={`h3 mb-3 fw-normal text-center ${
						errors['general'] && 'is-invalid'
					}`}
				>
					Please Log In
				</h1>
				<div className='invalid-feedback mb-2'>
					{errors['general'] && errors['general'].message}
				</div>
				<Input
					name={'Email'}
					label='email'
					register={register}
					validate={{
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					}}
					error={errors['email']}
					errorTxt={
						errors['email'] && errors['email'].type === 'manual'
							? errors['email'].message
							: 'Please enter a valid email address.'
					}
				/>

				<Input
					name={'Password'}
					type={'password'}
					label='password'
					register={register}
					validate={{
						required: true,
						minLength: 6
					}}
					error={errors['password']}
					errorTxt={
						errors['password'] && errors['password'].type === 'manual'
							? errors['password'].message
							: 'Please enter a password with at least 6 characters.'
					}
				/>

				<button className='w-100 btn btn-lg btn-dark' type='submit'>
					Log In
				</button>
			</form>
		</div>
	);
}
