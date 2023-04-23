import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PropTypes } from 'prop-types';

import { Button } from 'common';
import pipeDuration from 'helpers/pipeDuration';
import { SHOW_COURSE_BUTTON_TEXT } from 'constants.js';

import pen from 'assets/pen-solid.svg';
import trash from 'assets/trash-can-solid.svg';

import selectAuthors from 'store/authors/authorsSelectors';

import { deleteCourse } from 'store/courses/coursesSlice';

import styles from './CourseCard.module.css';

function CourseCard({
	id,
	title,
	description,
	authors,
	creationDate,
	duration,
}) {
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const authorsAll = useSelector(selectAuthors);

	const courseAuthorsNames = authors
		.map((authorID) =>
			authorsAll
				.filter((author) => author.id === authorID)
				.map((author) => author.name)
		)
		.join(', ');

	const handleShowCourse = useCallback(() => {
		navigation(`/courses/${id}`);
	}, [id, navigation]);

	const handleDeleteCourse = useCallback(
		(e) => {
			const courseToBeDeleted = e.currentTarget.getAttribute('data-course-id');
			dispatch(deleteCourse(courseToBeDeleted));
		},
		[dispatch]
	);

	return (
		<article className={styles['course-card']}>
			<div className={styles['card-content']}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles['card-info']}>
				<p className={styles.author}>
					<span className={styles['info-label']}>authors: </span>
					{courseAuthorsNames}
				</p>
				<p>
					<span className={styles['info-label']}>duration: </span>
					{pipeDuration(duration)} hours
				</p>
				<p>
					<span className={styles['info-label']}>created: </span>
					{creationDate}
				</p>
				<div className={styles['info-center']}>
					<Button text={SHOW_COURSE_BUTTON_TEXT} onClick={handleShowCourse} />
					<Button icon={pen} />
					<Button
						icon={trash}
						data-course-id={id}
						onClick={handleDeleteCourse}
					/>
				</div>
			</div>
		</article>
	);
}

CourseCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	creationDate: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
};

export default CourseCard;
