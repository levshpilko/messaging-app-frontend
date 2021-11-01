import React, { useState, useCallback } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import Messages from './components/Messages';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import NewMsg from './components/NewMsg';

function App() {
	const { token, login, logout, userId, userName } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const loadingHandler = useCallback(
		val => {
			setIsLoading(val);
		},
		[setIsLoading]
	);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				userId,
				userName,
				login,
				logout
			}}
		>
			<Router>
				<Nav loading={isLoading} />
				<Switch>
					<Route path='/' exact>
						<Messages loadingHandler={loadingHandler} />
					</Route>
					<Route path='/new-message' exact>
						<NewMsg />
					</Route>
					<Route path='/login' exact>
						<Login />
					</Route>
					<Route path='/signup' exact>
						<Signup />
					</Route>
					<Redirect to='/' />
				</Switch>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
