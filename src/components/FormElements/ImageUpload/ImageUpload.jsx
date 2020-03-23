import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';
import './ImageUpload.css';

export default function ImageUpload(props) {
	const [file, setFile] =  useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);

	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) return;
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickHandler = event => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files || event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		props.onInput(props.id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className="form-control">
			<input
				id={props.id}
				ref={filePickerRef}
				onChange={pickHandler}
				style={{ display: 'none' }}
				type="file"
				accept=".jpg,.png,.jpeg"
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					{previewUrl && <img src={previewUrl} alt="Preview" />}
					{!previewUrl && <p>Please pick an image.</p>}
				</div>
				{!isValid && <p>{props.errorText}</p>}
				<Button type="button" classes="btn--small btn--diff btn--white" click={pickImageHandler}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
}
