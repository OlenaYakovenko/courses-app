import { useCallback } from 'react';

import { PropTypes } from 'prop-types';

import { Button } from 'common';
import { ADD_AUTHOR_BUTTON_TEXT } from 'constants.js';

import styles from './AllAuthors.module.css';

function AllAuthors({
	authorsList,
	courseAuthorsList,
	setCourseAuthorsList,
	setAuthorsList,
}) {
	const handleAddAuthor = useCallback(
		(e) => {
			const authorID = e.currentTarget.getAttribute('data-author-id');
			const currentAuthor = authorsList.find(({ id }) => id === authorID);
			const newCourseAuthorsList = [...courseAuthorsList, currentAuthor];
			const leftAuhtors = authorsList.filter(({ id }) => id !== authorID);
			setCourseAuthorsList(newCourseAuthorsList);
			setAuthorsList(leftAuhtors);
		},
		[authorsList, setAuthorsList, setCourseAuthorsList, courseAuthorsList]
	);
	return (
		<fieldset className={styles['form-authors']}>
			<legend>Authors</legend>
			{authorsList.map((author) => (
				<p key={author.id} className={styles.author}>
					<span>{author.name}</span>
					<Button
						text={ADD_AUTHOR_BUTTON_TEXT}
						data-author-id={author.id}
						onClick={handleAddAuthor}
					/>
				</p>
			))}
		</fieldset>
	);
}

AllAuthors.propTypes = {
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	courseAuthorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	setCourseAuthorsList: PropTypes.func.isRequired,
	setAuthorsList: PropTypes.func.isRequired,
};

export default AllAuthors;
