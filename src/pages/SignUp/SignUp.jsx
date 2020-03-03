import React from 'react';

import Input from '../../components/FormElements/Input/Input'
import Button from '../../components/FormElements/Button/Button'
import './SignUp.scss'

export default function SignUp() {
	return (
		<div className="signup">
			<div className="signup--box">
				<h2 className="signup--box__title">Create an Account</h2>
				<form>
                    <Input placeholder="Full Name" id="full name" />
                    <Input placeholder="Email Address" type="email" id="email" />
                    <Input placeholder="Password" type="password" id="password" />
                    <Input placeholder="Confirm Password" type="password" id="password" />
                    <Button> Create An Account </Button>
				</form>
			</div>
		</div>
	);
}
