import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import SignUp from './pages/SignUp/SignUp';
import UserAccount from './pages/UserAccount/UserAccount';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hooks';

function App() {
	const {token, login, logout, user} = useAuth();
	let route;
	if (token) {
		route = (
			<Switch>
				<Route path="/my-account">
					<UserAccount />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		route = (
			<Switch>
				<Route path="/signup">
					<SignUp />
				</Route>
				<Redirect to="/signup" />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				login,
				logout,
				user,
			}}
		>
			<Router>
				<MainNavigation />
				{route}
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
