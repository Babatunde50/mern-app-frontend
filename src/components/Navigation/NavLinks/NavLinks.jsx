import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';

import Button from '../../FormElements/Button/Button';
import './NavLinks.css';

export default function NavLinks() {
	const { isLoggedIn, logout } = useContext(AuthContext);
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/live" exact>
					Live
				</NavLink>
			</li>
			<li>
				<NavLink to="/players"> Players </NavLink>
			</li>
			<li>
				<NavLink to="/teams"> Teams </NavLink>
			</li>
			<li>
				<NavLink to="/matches"> Matches </NavLink>
			</li>
			{!isLoggedIn && (
				<li>
					<NavLink className="nav-links__cta" to="/signup">
						{' '}
						Create a Free Account{' '}
					</NavLink>
				</li>
			)}
			{isLoggedIn && (
				<li>
					<NavLink to="/my-account"> My Account </NavLink>
				</li>
			)}
			{isLoggedIn && (
				<li>
					<Button classes="btn--white" isLink={true} click={logout}>Logout</Button>
				</li>
			)}
		</ul>
	);
}
