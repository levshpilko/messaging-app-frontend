import React, { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

export default function MessageContent({ message }) {
	const { userName } = useContext(AuthContext);

	return (
		<div className='col-9'>
			<div
				className={`${message && 'card'} `}
				style={{ width: '100%', height: '100%' }}
			>
				{message ? (
					<div className='card-body'>
						<h5 className='card-title'>Subject: {message.subject}</h5>
						<h6 className='card-subtitle my-2 text-muted'>
							From: {message.sender === userName ? 'me' : message.sender}
							<br />
							To: {message.receiver === userName ? 'me' : message.receiver}
						</h6>
						<p className='card-text'>{message.content}</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
