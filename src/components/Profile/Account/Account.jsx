import React, { useContext } from 'react';

import './Account.scss';

import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import ImageUpload from '../../FormElements/ImageUpload/ImageUpload';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_CONFIRM } from '../../../utils/validators';
import { useForm } from '../../../hooks/form-hooks';
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';

export default function Account() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { user, token } = useContext(AuthContext);
	const [basicDetailsState, basicDetailsInputHandler, setBasicDetails] = useForm({
		email: {
			value: '',
			isValid: true,
		},
		name: {
			value: '',
			isValid: true,
		},
		age: {
			value: '',
			isValid: true,
		},
	});
	const [imageState, imageHandler, setImageHandler] = useForm({
		image: {
			value: null,
			isValid: false,
		},
	});
	const [passwordState, passwordHandler, setPasswordHandler] = useForm({
		initialPassword: {
			value: '',
			isValid: true,
		},
		newPassword: {
			value: '',
			isValid: true,
		},
		confirmNewPassword: {
			value: '',
			isValid: true,
		},
	});

	const submitBasicDetailsHandler = async () => {
		console.log(basicDetailsState);

		// try {
		// 	const data = {
		// 		name: user.name === basicDetailsState.inputs.name.value ? undefined : basicDetailsState.inputs.name.value,
		// 		email: user.email === basicDetailsState.inputs.email.value ? undefined : basicDetailsState.inputs.email.value,
		// 		age:
		// 			user.age.toString() === basicDetailsState.inputs.age.value ? undefined : basicDetailsState.inputs.age.value,
		// 	};
		// 	const response = await sendRequest('users/update-me/basic-info', 'PATCH', data, {
		// 		authorization: `Bearer ${token}`,
		// 	});
		// 	console.log(response);
		// } catch (err) {}
	};

	const submitProfileImageHandler = event => {
		console.log(imageState);
	};

	const submitPasswordHandler = event => {
		console.log(passwordState);
	};

	return (
		<>
			<div className="account--basic account--margin">
				<h2>Update User</h2>

				<Input
					type="email"
					placeholder="Email"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email address"
					onInput={basicDetailsInputHandler}
					initialValue={user.email}
					id="email"
				/>

				<Input
					placeholder="Full Name"
					validators={[VALIDATOR_MINLENGTH(4)]}
					errorText="Please enter a valid Name"
					onInput={basicDetailsInputHandler}
					initialValue={user.name}
					id="name"
				/>
				<Input
					type="number"
					placeholder="Age"
					validators={[VALIDATOR_MIN(15)]}
					errorText="Please enter a valid age"
					initialValue={user.age}
					id="age"
					onInput={basicDetailsInputHandler}
				/>
				<Button disabled={!basicDetailsState.isValid} classes="btn--primary" click={submitBasicDetailsHandler}>
					Update
				</Button>
			</div>
			<div className="account--picture account--margin">
				<h2>Update Profile Pics</h2>
				<ImageUpload id="image" errorText="Please provide an image." onInput={imageHandler} />
				<Button disabled={!imageState.inputs.image.isValid} click={submitProfileImageHandler} classes="btn--primary">
					Update
				</Button>
			</div>
			<div className="account--password account--margin">
				<h2>Change Password</h2>
				<Input
					type="password"
					placeholder="Initial Password"
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText="Password must be atleast 6 characters"
					onInput={passwordHandler}
					id="initialPassword"
				/>
				<Input
					placeholder="New Password"
					type="password"
					id="newPassword"
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText="Password must be atleast 6 characters"
					onInput={passwordHandler}
				/>
				<Input
					placeholder="Confirm Password"
					type="password"
					id="confirmNewPassword"
					validators={[VALIDATOR_CONFIRM(passwordState.inputs.newPassword.value)]}
					errorText="Value must match with password value"
					onInput={passwordHandler}
				/>
				<Button disabled={!passwordState.isValid} classes="btn--primary" click={submitPasswordHandler}>
					Update
				</Button>
			</div>
		</>
	);
}
