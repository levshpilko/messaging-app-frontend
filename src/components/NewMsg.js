import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttpCall from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import Input from './Input';

export default function NewMsg() {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { sendHttpReq } = useHttpCall();

	// const { post, response } = useFetch(process.env.REACT_APP_SERVER_URL, {
	// 	headers: { Authorization: 'Bearer ' + auth.token }
	// });

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm();

	const onSubmit = async data => {
		try {
			await sendHttpReq({
				url: `/api/messages/`,
				method: 'POST',
				data: { ...data, sender: auth.userId },
				headers: { Authorization: 'Bearer ' + auth.token }
			});
			history.push('/');
		} catch (err) {
			setError(err.errorType, {
				type: 'manual',
				message: err.message
			});
		}
	};

	return (
		<div className='container'>
			{auth.isLoggedIn ? (
				<div className='container mt-5'>
					<form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
						<h1
							className={`h3 mb-3 fw-normal text-center ${
								errors['general'] && 'is-invalid'
							}`}
						>
							Please Write A New Message
						</h1>
						<div className='invalid-feedback mb-2'>
							{errors['general'] && errors['general'].message}
						</div>
						<Input
							name={'To'}
							label='receiver'
							register={register}
							validate={{
								required: true
							}}
							error={errors['receiver']}
							errorTxt={
								errors['receiver'] && errors['receiver'].type === 'manual'
									? errors['receiver'].message
									: 'Please enter a valid user name.'
							}
						/>
						<Input name={'Subject'} label='subject' />

						<div className='form-floating mb-2 '>
							<textarea
								className={`form-control ${errors['content'] && 'is-invalid'}`}
								placeholder='Leave a message here'
								id='floatingTextarea'
								{...register('content', { required: true, minLength: 5 })}
							></textarea>
							<label htmlFor='floatingTextarea'>Your Message</label>
							<div className='invalid-feedback'>
								{errors['content'] && errors['content'].type === 'manual'
									? errors['content'].message
									: 'Please enter a message with at least 5 characters.'}
							</div>
						</div>

						<button className='w-100 btn btn-lg btn-dark' type='submit'>
							Send Message
						</button>
					</form>
				</div>
			) : (
				<h4 className='text-center mt-5'>
					Please log in or sign up to send messages
				</h4>
			)}
		</div>
	);
}
