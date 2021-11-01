import React from 'react';

export default function Input(props) {
	return (
		<div className='form-floating mb-2'>
			<input
				type={props.type || 'text'}
				className={`form-control ${props.error && 'is-invalid'}`}
				// id={props.id}
				placeholder={''}
				{...(props.register && {
					...props.register(props.label, props.validate)
				})}
			/>
			<label>{props.name}</label>

			<div className='invalid-feedback'>{props.errorTxt}</div>
		</div>
	);
}
