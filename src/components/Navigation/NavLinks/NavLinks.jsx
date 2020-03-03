import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css'

export default function NavLinks() {
	return (
		<ul className="nav-links">
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
			<li>
				<NavLink className="nav-links__cta" to="/matches"> Create a Free Account </NavLink>
			</li>
		</ul>
	);
}
