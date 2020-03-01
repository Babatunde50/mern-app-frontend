import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';

function App() {
	return (
		<Router>
			<MainNavigation />
		</Router>
	);
}

export default App;
