import { Button } from 'common';
import { DELETE_AUTHOR_BUTTON_TEXT } from 'constants';
import { useCallback } from 'react';
import styles from './CourseAuthors.module.css';

function CourseAuthors({
	courseAuthorsList,
	setCourseAuthorsList,
	setAuthorsList,
	authorsList,
}) {
	const handleDeleteAuthor = useCallback(
		(e) => {
			const authorID = e.currentTarget.getAttribute('data-author-id');
			const authorToBeDeleted = courseAuthorsList.find(
				({ id }) => id === authorID
			);
			const leftCourseAuthors = courseAuthorsList.filter(
				({ id }) => id !== authorID
			);
			const newAuthorsList = [...authorsList, authorToBeDeleted];
			setAuthorsList(newAuthorsList);
			setCourseAuthorsList(leftCourseAuthors);
		},
		[courseAuthorsList, setCourseAuthorsList, setAuthorsList, authorsList]
	);
	return (
		<fieldset>
			<legend>Course authors</legend>
			{courseAuthorsList.length > 0 ? (
				courseAuthorsList.map((author) => (
					<p key={author.id} className={styles.author}>
						<span>{author.name}</span>
						<Button
							text={DELETE_AUTHOR_BUTTON_TEXT}
							data-author-id={author.id}
							onClick={handleDeleteAuthor}
						/>
					</p>
				))
			) : (
				<p>Author list is empty</p>
			)}
		</fieldset>
	);
}

export default CourseAuthors;
