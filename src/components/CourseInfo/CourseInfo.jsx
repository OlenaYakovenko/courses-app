import { Link, useParams } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from 'constants.js';
import pipeDuration from 'helpers/pipeDuration';

import styles from 'components/CourseInfo/CourseInfo.module.css';

function CourseInfo() {
	const { courseId } = useParams();

	const course = mockedCoursesList.find(({ id }) => id === courseId);
	const { id, title, description, duration, creationDate, authors } = course;

	return (
		<section className={styles['course-info']}>
			<Link to='/courses'>{'< Back to courses'}</Link>
			<h2 className={styles['info-title']}>{title}</h2>
			<div className={styles['info-content']}>
				<div className={styles['info-description']}>{description}</div>
				<div className={styles['info-meta']}>
					<p>
						<span>ID: </span>
						{id}
					</p>
					<p>
						<span>Duration: </span>
						{pipeDuration(duration)} hours
					</p>
					<p>
						<span>Created: </span>
						{creationDate}
					</p>
					<div>
						<p className={styles.authors}>Authors:</p>
						{authors.map((authorID) =>
							mockedAuthorsList
								.filter((author) => author.id === authorID)
								.map((author) => <p key={author.id}>{author.name}</p>)
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
export default CourseInfo;
