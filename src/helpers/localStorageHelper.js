export const deleteLocalStorage = ({ key }) => localStorage.removeItem(key);

export const getLocalStorage = (key) => {
	const data = localStorage.getItem(key);
	return JSON.parse(data);
};

export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};
