import { Button } from 'common';
import { ADD_AUTHOR_BUTTON_TEXT } from 'constants';
import { useCallback } from 'react';
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
export default AllAuthors;
