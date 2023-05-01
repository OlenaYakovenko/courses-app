import { useCallback } from 'react';

import { PropTypes } from 'prop-types';
import { Button } from 'common';
import { DELETE_AUTHOR_BUTTON_TEXT } from 'constants.js';

import { useSelector } from 'react-redux';
import selectAuthors from 'store/authors/authorsSelectors';

import styles from './CourseAuthors.module.css';

function CourseAuthors({ courseAuthorsList, setCourseAuthorsList }) {
	const authorsList = useSelector(selectAuthors);
	const handleDeleteAuthor = useCallback(
		(e) => {
			const authorID = e.currentTarget.getAttribute('data-author-id');
			const leftCourseAuthors = courseAuthorsList.filter(
				(id) => id !== authorID
			);
			setCourseAuthorsList(leftCourseAuthors);
		},
		[courseAuthorsList, setCourseAuthorsList]
	);
	return (
		<fieldset data-testid='courseAuthorsList'>
			<legend>Course authors</legend>
			{courseAuthorsList.length > 0 ? (
				courseAuthorsList.map((author) => {
					const authorObj = authorsList.find(({ id }) => id === author);
					const { name, id } = authorObj;
					return (
						<p key={id} className={styles.author}>
							<span data-testid='courseAuthorName'>{name}</span>
							<Button
								text={DELETE_AUTHOR_BUTTON_TEXT}
								data-author-id={author}
								onClick={handleDeleteAuthor}
							/>
						</p>
					);
				})
			) : (
				<p>Author list is empty</p>
			)}
		</fieldset>
	);
}

CourseAuthors.propTypes = {
	courseAuthorsList: PropTypes.arrayOf(PropTypes.string).isRequired,
	setCourseAuthorsList: PropTypes.func.isRequired,
};

export default CourseAuthors;
