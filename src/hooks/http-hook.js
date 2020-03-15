import { useState, useCallback,  useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const signal =  axios.CancelToken.source();

	const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setIsLoading(true);
		try {
            const response = await axios({
                method,
                url,
                data: body,
                cancelToken: signal.token,
                headers
              })
			setIsLoading(false);
			return response;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	}, [signal.token]);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			signal.cancel('Api is being canceled');
		};
	}, [signal]);

	return { isLoading, error, sendRequest, clearError };
};
