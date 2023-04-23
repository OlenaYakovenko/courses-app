const dateGenerator = () => {
	const creationDate = new Date();

	return `${creationDate.getDate()}/${
		creationDate.getMonth() + 1
	}/${creationDate.getFullYear()}`;
};

export default dateGenerator;
