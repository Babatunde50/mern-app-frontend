import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setIsLoading(true);
		try {
			const response = await axios({
				method,
				url,
				data: body,
				headers,
			});
			setIsLoading(false);
			return response;
		} catch (err) {
			setError(err.response.data.message);
			setIsLoading(false);
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, sendRequest, clearError };
};
