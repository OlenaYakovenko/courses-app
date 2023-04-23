import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import selectCourses from 'store/courses/coursesSelectors';

import { ADD_COURSE_BUTTON_TEXT } from 'constants.js';

import { Button } from 'common';
import { CourseCard, SearchBar } from './components';

import styles from './Courses.module.css';

function Courses() {
	const navigation = useNavigate();

	const courses = useSelector(selectCourses);

	const handleAddCourse = useCallback(
		() => navigation('/courses/add'),
		[navigation]
	);

	return (
		<section>
			<header className={styles['courses-header']}>
				<SearchBar />
				<Button text={ADD_COURSE_BUTTON_TEXT} onClick={handleAddCourse} />
			</header>
			{courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</section>
	);
}

export default Courses;
