import React, { useContext } from 'react';

import useHttpCall from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';

export default function SubjectList(props) {
	const auth = useContext(AuthContext);
	const { sendHttpReq } = useHttpCall();

	const clickedMsgHandler = async msgId => {
		const clickedMsg = props.messages.find(m => m._id === msgId);

		if (!clickedMsg.read) {
			try {
				const res = await sendHttpReq({
					url: `${process.env.REACT_APP_SERVER_URL}/api/messages/${clickedMsg._id}`,
					method: 'PATCH',
					headers: { Authorization: 'Bearer ' + auth.token }
				});
			} catch (err) {
				console.log(err);
			}
		}

		props.changeChosenMsg({
			subject: clickedMsg.subject,
			sender: clickedMsg.sender.userName,
			receiver: clickedMsg.receiver.userName,
			content: clickedMsg.content
		});
	};

	return (
		<div className='col-3 overflow-auto' style={{ height: '80vh' }}>
			<ul className='list-group'>
				{props.messages.map(msg => (
					<li
						className='list-group-item'
						key={msg._id}
						onClick={() => {
							clickedMsgHandler(msg._id);
						}}
					>
						<div>
							<p>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									className='mx-2'
									viewBox='0 0 16 16'
								>
									{msg.read ? (
										<path d='M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z' />
									) : (
										<path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z' />
									)}
								</svg>
								{msg.subject}
							</p>
							<p className='text-end text-muted'>
								{msg.creationDate.split('T')[0].split('-').reverse().join('/')}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
