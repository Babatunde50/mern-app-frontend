import React, { useState, Fragment } from 'react';

import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import { useForm } from '../../hooks/form-hooks';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_CONFIRM } from '../../utils/validators';
import './SignUp.scss';

const options = [
	{ value: 'player', label: 'Player' },
	{ value: 'Referee', label: 'Referee' },
	{ value: 'Team', label: 'Team' },
	{ value: 'Admin', label: 'Admin' },
];

export default function SignUp() {
	const [mode, setMode] = useState('signup');
	const [userType, setUserType] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler, setFormData] = useForm({
		email: {
			value: '',
			isValid: false,
		},
		password: {
			value: '',
			isValid: false,
		},
		name: {
			value: '',
			isValid: false,
		},
		type: {
			value: '',
			isValid: false,
		},
	});
	const continueSignUpHandler = () => {
		setUserType(true);
	};
	const setModeHandler = async () => {
		if (mode === 'signup') {
			setUserType(true);
			setMode('login');
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					type: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setUserType(false);
			setMode('signup');
		}
		console.log(formState.inputs);
	};
	const authSubmitHandler = async e => {
		e.preventDefault();
		const data = {
			email: formState.inputs.email.value,
			password: formState.inputs.name.value
		};
		console.log(data);
		if (mode === 'signup') {
			const signupData = {
				...data,
				name: formState.inputs.name.value,
				type: formState.inputs.type.value,
			};
			const response = await sendRequest(`users/signup/user`, 'POST', signupData);
			console.log(response);
		} else {
			const response = await sendRequest('users/login/user', 'POST', data);
			console.log(response);
		}
	};
	const Auth = (
		<Fragment>
			{ mode === 'signup' && <Input
				placeholder={`${mode === 'signup' && formState.inputs.type.value.charAt(0).toUpperCase() +
					formState.inputs.type.value.slice(1)} Name`}
				id="name"
				validators={[VALIDATOR_MINLENGTH(4)]}
				errorText="Please enter a valid full name"
				onInput={inputHandler}
			/>}
			<Input
				placeholder="Email Address"
				type="email"
				id="email"
				validators={[VALIDATOR_EMAIL()]}
				errorText="Please enter a valid email address"
				onInput={inputHandler}
			/>
			<Input
				placeholder="Password"
				type="password"
				id="password"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
				errorText="Password must be atleast 6 characters"
				onInput={inputHandler}
			/>
			{ mode === 'signup' && <Input
				placeholder="Confirm Password"
				type="password"
				id="confirmPassword"
				validators={[VALIDATOR_CONFIRM(formState.inputs.password.value)]}
				errorText="Value must match with password value"
				onInput={inputHandler}
			/> }
			<Button classes="btn--primary" disabled={!formState.isValid}>
				{mode === 'signup' ? 'Create An Account' : 'Login'}
				
			</Button>
		</Fragment>
	);
	const preAuth = (
		<Fragment>
			<Input
				type="select"
				options={options}
				id="type"
				placeholder="Sign up as"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Invalid Sign up type"
				onInput={inputHandler}
			/>
			<Button click={continueSignUpHandler} classes="btn--primary" disabled={!!formState.inputs.type && !formState.inputs.type.value}>
				Continue
			</Button>
		</Fragment>
	);
	return (
		<div className="signup">
			<div className="signup--box">
				<h2 className="signup--box__title"> {mode === 'signup' ? 'Create an Account' : 'Login to your account'}</h2>
				{!userType && preAuth}
				{userType && <form onSubmit={authSubmitHandler}>{Auth}</form>}
			</div>
			<p onClick={setModeHandler} className="signup--switch">
				{mode === 'signup' ? 'Already have an account? Log In' : "Don't have an account yet? Sign Up"}{' '}
			</p>
		</div>
	);
}
