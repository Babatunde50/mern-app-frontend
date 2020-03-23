import React from 'react';
import { NavLink, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import Account from '../../components/Profile/Account/Account';

import './UserAccount.scss';

export default function UserAccount() {
	const { path, url } = useRouteMatch();
	return (
		<div className="user-account main">
			<nav className="user-account--nav">
				<ul className="nav-links">
					<li>
						<NavLink exact="true" to={`${url}`}>Account</NavLink>
					</li>
					<li>
						<NavLink exact="true" to={`${url}/matches`}>Matches</NavLink>
					</li>
					<li>
						<NavLink exact="true" to={`${url}/notifications`}>Notifications</NavLink>
					</li>
				</ul>
			</nav>

			<div className="user-account--content">
				<Switch>
					<Route exact path={path}>
						<Account />
					</Route>
					<Route exact path={`${path}/matches`}>
						<h3> Matches </h3>
					</Route>
					<Route exact path={`${path}/notifications`}>
						<h3> Notifications </h3>
					</Route>
					<Redirect to={path} />
				</Switch>
			</div>
		</div>
	);
}
 