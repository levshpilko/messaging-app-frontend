import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const textStyle = {
	textDecoration: 'none'
};

export default function Nav({ loading }) {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		auth.logout();
		history.push('/');
	};

	return (
		<>
			<nav className='navbar navbar-dark bg-dark'>
				<div className='container-fluid'>
					<NavLink to='/' className='navbar-brand mb-0 h1'>
						Messanger
					</NavLink>
					<div className='navbar-text '>
						{loading ? (
							<div
								className='spinner-border spinner-border-sm text-danger mx-4'
								role='status'
							>
								<span className='visually-hidden'>Loading...</span>
							</div>
						) : null}

						{!auth.isLoggedIn ? (
							[
								<NavLink
									to='/login'
									className='mx-2'
									style={textStyle}
									key='login'
								>
									<button
										type='button'
										className='btn btn-outline-light btn-md'
									>
										Login
									</button>
								</NavLink>,
								<NavLink
									to='/signup'
									className='mx-2'
									style={textStyle}
									key='signup'
								>
									<button
										type='button'
										className='btn btn-outline-light btn-md'
									>
										Signup
									</button>
								</NavLink>
							]
						) : (
							<button
								type='button'
								className='btn btn-outline-light btn-md'
								onClick={logoutHandler}
							>
								logout
							</button>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
