import { useState, useEffect, useCallback } from 'react';

import {
	mockedCoursesList,
	mockedAuthorsList,
	ADD_COURSE_BUTTON_TEXT,
} from 'constants.js';
import { Button } from 'common';
import { CourseCard, SearchBar } from 'components/Courses/components';

import styles from './Courses.module.css';

function Courses({ setIsAddingCourse }) {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		setCourses(mockedCoursesList);
	}, []);

	const handleAddCourse = useCallback(
		() => setIsAddingCourse(true),
		[setIsAddingCourse]
	);

	return (
		<section>
			<header className={styles['courses-header']}>
				<SearchBar setCourses={setCourses} />
				<Button text={ADD_COURSE_BUTTON_TEXT} onClick={handleAddCourse} />
			</header>
			{courses.map((course) => {
				const authorsNames = course.authors
					.map((authorID) =>
						mockedAuthorsList
							.filter(({ id }) => id === authorID)
							.map((author) => author.name)
					)
					.join(', ');

				return (
					<CourseCard key={course.id} {...course} authorsNames={authorsNames} />
				);
			})}
		</section>
	);
}

export default Courses;
