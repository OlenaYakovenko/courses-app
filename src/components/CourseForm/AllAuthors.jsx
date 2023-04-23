import { useCallback } from 'react';

import { PropTypes } from 'prop-types';

import { Button } from 'common';
import { ADD_AUTHOR_BUTTON_TEXT } from 'constants.js';

import { useSelector } from 'react-redux';
import selectAuthors from 'store/authors/authorsSelectors';
import styles from './AllAuthors.module.css';

function AllAuthors({ courseAuthorsList, setCourseAuthorsList }) {
	const authorsList = useSelector(selectAuthors);

	const renderedAuthors = authorsList.filter(
		({ id }) => !courseAuthorsList.includes(id)
	);
	const handleAddAuthor = useCallback(
		(e) => {
			const authorID = e.currentTarget.getAttribute('data-author-id');
			const newCourseAuthorsList = [...courseAuthorsList, authorID];
			setCourseAuthorsList(newCourseAuthorsList);
		},
		[setCourseAuthorsList, courseAuthorsList]
	);
	return (
		<fieldset className={styles['form-authors']}>
			<legend>Authors</legend>
			{renderedAuthors.map((author) => (
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
	courseAuthorsList: PropTypes.arrayOf(PropTypes.string).isRequired,
	setCourseAuthorsList: PropTypes.func.isRequired,
};
export default AllAuthors;
