import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import SignUp from './pages/SignUp/SignUp'

function App() {
	return (
		<Router>
			<MainNavigation />
			<Switch>
				<Route path="/signup">
					<SignUp />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
