import React from 'react';

import './Spinner.scss'

export default function Spinner() {
	return (
		<div class="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
