import React from 'react';

import './Input.scss'

export default function Input({ type="text", placeholder, id  }) {
	return (
		<div class="form__group">
			<input type={type} class="form__input" placeholder={placeholder} id={id} required />
			<label for={id} class="form__label">
				{ placeholder }
			</label>
		</div>
	);
}
