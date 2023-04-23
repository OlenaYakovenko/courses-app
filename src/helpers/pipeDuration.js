const pipeDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	return `${hours < 10 ? `0${hours}` : hours}:${
		minutes < 10 ? `0${minutes}` : minutes
	}`;
};

export default pipeDuration;
