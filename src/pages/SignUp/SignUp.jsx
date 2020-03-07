import React, { useState, Fragment } from 'react';

import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import { useForm } from '../../hooks/form-hooks';
import {  VALIDATOR_REQUIRE  } from '../../utils/validators'
import './SignUp.scss';

const options = [
	{ value: 'player', label: 'Player' },
	{ value: 'Referee', label: 'Referee' },
	{ value: 'Team', label: 'Team' },
	{ value: 'Admin', label: 'Admin' },
];

export default function SignUp() {
	const [mode, setMode] = useState('signup');
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
			isValid: false
		},
		age: {
			value: '',
			isValid: false
		},
		confirmPassword: {
			value: '',
			isValid: false
		},
		type: {
			value: '',
			isValid: false
		}
	});
	const setModeHandler = () => {
		mode === 'signup' ? setMode('login') : setMode('signup');
	};
	const signup = (
		<Fragment>
			<Input placeholder="Full Name" id="full name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Input placeholder="Email Address" type="email" id="email" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid email address" onInput={inputHandler} />
			<Input placeholder="Age" type="number" id="age" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Input placeholder="Password" type="password" id="password" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Input placeholder="Confirm Password" type="password" id="confirmPassword" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Input type="select" options={options} placeholder="Sign up as" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Button classes="btn--primary"> Create An Account </Button>
		</Fragment>
	);
	const login = (
		<Fragment>
			<Input placeholder="Email Address" type="email" id="email" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Input placeholder="Password" type="password" id="password" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid name" onInput={inputHandler} />
			<Button classes="btn--primary"> Login </Button>
		</Fragment>
	);
	return (
		<div className="signup">
			<div className="signup--box">
				<h2 className="signup--box__title"> {mode === 'signup' ? 'Create an Account' : 'Login to your account'}</h2>
				<form>{mode === 'signup' ? signup : login}</form>
			</div>
			<p onClick={setModeHandler} className="signup--switch">
				{mode === 'signup' ? 'Already have an account? Log In' : "Don't have an account yet? Sign Up"}{' '}
			</p>
		</div>
	);
}
