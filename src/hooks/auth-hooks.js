import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [user, setUser] = useState(false);
	const login = useCallback((user, token, expirationDate) => {
		setToken(token);
		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 3600);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({ user, token, expiration: tokenExpirationDate.toISOString() })
		);
		setUser(user);
	}, []);
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.user, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);
	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	return { token, login, logout, user };
};
