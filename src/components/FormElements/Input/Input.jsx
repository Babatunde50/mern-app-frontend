import React, { useReducer, useEffect } from 'react';
import Select from 'react-select';

import './Input.scss';
import { validate } from '../../../utils/validators';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				value: action.val,
				isTouched: true
			};
		default:
			return state;
	}
};

export default function Input({
	type = 'text',
	placeholder,
	id,
	options = null,
	initialValue,
	initialValid,
	onInput,
	validators,
	errorText,
}) {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: initialValue || '',
		isTouched: false,
		isValid: initialValid || false,
	});
	const { value, isValid } = inputState;
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);
	const changeHandler = (event, type) => {
		const value = type === 'select' ? event.value : event.target.value;
		dispatch({ type: 'CHANGE', val: value, validators: validators });
	};
	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		});
	};
	return (
		<div className={`form__group ${!inputState.isValid && inputState.isTouched && 'form__group--invalid'}`}>
			{type === 'select' ? (
				<Select onChange={e => changeHandler(e, 'select')} options={options} id={id} placeholder={placeholder} />
			) : (
				<>
					<input
						value={inputState.value}
						onChange={changeHandler}
						onBlur={touchHandler}
						type={type}
						className="form__input"
						placeholder={placeholder}
						id={id}
					/>
					<label
						htmlFor={id}
						className={`form__label ${!inputState.isValid && inputState.isTouched && 'form__label--hidden'}`}
					>
						{placeholder}
					</label>
				</>
			)}
			{!inputState.isValid && inputState.isTouched && <p> {errorText} </p>}
		</div>
	);
}
