import { Button } from '../../../../common';
import pipeDuration from '../../../../helpers/pipeDuration';
import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';

import styles from './CourseCard.module.css';

function CourseCard({
	title,
	description,
	authorsNames,
	creationDate,
	duration,
}) {
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
					<Button text={SHOW_COURSE_BUTTON_TEXT} />
				</div>
			</div>
		</article>
	);
}

export default CourseCard;