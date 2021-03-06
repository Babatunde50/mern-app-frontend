import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import './MainNavigation.scss';

export default function MainNavigation() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const toggleDrawerHandler = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};
	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};
	return (
		<Fragment>
			<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				<h1 className="main-navigation__title">
					<Link to="/"> LOGO </Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
				<button className="main-navigation__menu-btn" onClick={toggleDrawerHandler}>
					<span className={drawerIsOpen ? 'main-navigation__menu-btn__before' : ''} />
					<span className={drawerIsOpen ? 'main-navigation__menu-btn__middle' : ''} />
					<span className={drawerIsOpen ? 'main-navigation__menu-btn__after' : '' } />
				</button>
			</MainHeader>
		</Fragment>
	);
}
