import { useNavigate } from 'react-router-dom';

import { PropTypes } from 'prop-types';

import { Button } from 'common';
import pipeDuration from 'helpers/pipeDuration';
import { SHOW_COURSE_BUTTON_TEXT } from 'constants.js';

import { useCallback } from 'react';

import styles from './CourseCard.module.css';

function CourseCard({
	id,
	title,
	description,
	authorsNames,
	creationDate,
	duration,
}) {
	const navigation = useNavigate();

	const handleShowCourse = useCallback(() => {
		navigation(`/courses/${id}`);
	}, [id, navigation]);

	return (
		<article className={styles['course-card']}>
			<div className={styles['card-content']}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles['card-info']}>
				<p className={styles.author}>
					<span className={styles['info-label']}>authors: </span>
					{authorsNames}
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
				</div>
			</div>
		</article>
	);
}

CourseCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authorsNames: PropTypes.string.isRequired,
	creationDate: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
};

export default CourseCard;
