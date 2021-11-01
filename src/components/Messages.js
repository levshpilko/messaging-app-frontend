import React, { useState, useEffect, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import SubjectList from './SubjectList';
import MessageContent from './MessageContent';
import useHttpCall from '../hooks/http-hook';

export default function Messages({ loadingHandler }) {
	const auth = useContext(AuthContext);
	const [messages, setMessages] = useState();
	const [chosenMsg, setChosenMsg] = useState();
	const { sendHttpReq } = useHttpCall();

	const initMsgs = useCallback(
		async showMsgMode => {
			loadingHandler(true);
			try {
				const res = await sendHttpReq({
					url: `${process.env.REACT_APP_SERVER_URL}/api/messages/user/${
						auth.userId
					}${showMsgMode ? showMsgMode : ''}`,
					method: 'GET',
					headers: { Authorization: 'Bearer ' + auth.token }
				});
				setMessages(res);
				loadingHandler(false);
			} catch (err) {
				console.log(err.message);
			}
		},
		[sendHttpReq, auth.token, loadingHandler, auth.userId]
	);

	useEffect(() => {
		if (auth.token) {
			initMsgs();
		}
	}, [initMsgs, auth.token]);

	const chooseMsgHandler = msg => {
		setChosenMsg(msg);
	};

	const changeShownMsgsHandler = e => {
		let showMsgMode;

		if (e.target.value === 'sentMsgs') {
			showMsgMode = '?sent=true';
		} else if (e.target.value === 'unreadMsgs') {
			showMsgMode = '?unread=true';
		}
		initMsgs(showMsgMode);
	};

	let pageContent;

	if (messages) {
		if (messages.length === 0)
			pageContent = (
				<div
					className='card mb-3'
					style={{ maxWidth: '80%', maxHeight: '100%', margin: '100px auto' }}
				>
					<div className='row g-0'>
						<div className='col-md-4'>
							<img
								src='https://media.giphy.com/media/t5qY8FyyM85a0/giphy.gif?cid=ecf05e47k8afwsgq1om45an8gj85uvurzkiuyq3o7ehss2mq&rid=giphy.gif&ct=g'
								className='img-fluid rounded-start'
								alt='...'
							/>
						</div>
						<div className='col-md-8'>
							<div className='card-body'>
								<h5 className='card-title'>Sorry, no messages yet.</h5>
								<p className='card-text'>
									Check again later when you make some friends
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		else if (messages.length > 0)
			pageContent = (
				<div className='row'>
					<SubjectList messages={messages} changeChosenMsg={chooseMsgHandler} />
					<MessageContent message={chosenMsg} />
				</div>
			);
	}

	return (
		<div className='container'>
			{auth.isLoggedIn ? (
				<>
					<div className='form-check form-check-inline  my-4'>
						<input
							className='form-check-input'
							type='radio'
							name='msgsShown'
							id='inlineRadio1'
							value='allMsgs'
							onChange={changeShownMsgsHandler}
							defaultChecked
						/>
						<label className='form-check-label' htmlFor='inlineRadio1'>
							All Messages
						</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='msgsShown'
							id='inlineRadio2'
							value='unreadMsgs'
							onChange={changeShownMsgsHandler}
						/>
						<label className='form-check-label' htmlFor='inlineRadio2'>
							Unread Messages
						</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='msgsShown'
							id='inlineRadio2'
							value='sentMsgs'
							onChange={changeShownMsgsHandler}
						/>
						<label className='form-check-label' htmlFor='inlineRadio2'>
							Sent Messages
						</label>
					</div>
					<NavLink to='/new-message' key='login' className='mx-3'>
						<button type='button' className='btn btn-danger btn-md'>
							Send A Message
						</button>
					</NavLink>
					{pageContent}
				</>
			) : (
				<h4 className='text-center mt-5'>
					Please log in or sign up to see messages
				</h4>
			)}
		</div>
	);
}
