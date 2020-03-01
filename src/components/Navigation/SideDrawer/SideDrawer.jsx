import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export default function SideDrawer({ children, show, onClick }) {
	const content = (
		<CSSTransition in={show} timeout={200} classNames="slide-in-right" mountOnEnter unmountOnExit>
			<aside className="side-drawer" onClick={onClick} >{children}</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}
