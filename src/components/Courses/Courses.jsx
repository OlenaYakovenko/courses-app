import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import selectCourses from 'store/courses/coursesSelectors';
import { selectIsAdmin } from 'store/user/userSelectors';

import selectAuthors from 'store/authors/authorsSelectors';
import { getAllAuthors } from 'store/authors/authorsSlice';

import { getAllCourses } from 'store/courses/coursesSlice';

import { ADD_COURSE_BUTTON_TEXT } from 'constants.js';

import { Button, Spinner } from 'common';

import { CourseCard, SearchBar } from './components';

import styles from './Courses.module.css';

function Courses() {
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);
	const isLoading = useSelector((state) => state.courses.isLoading);
	const isAdmin = useSelector(selectIsAdmin);

	useEffect(() => {
		if (courses.length < 1) {
			dispatch(getAllCourses());
		}
	}, [courses.length, dispatch]);

	useEffect(() => {
		if (authors.length < 1) {
			dispatch(getAllAuthors());
		}
	}, [authors.length, dispatch]);

	const handleAddCourse = useCallback(
		() => navigation('/courses/add'),
		[navigation]
	);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<section>
			<header className={styles['courses-header']}>
				<SearchBar />
				{isAdmin && (
					<Button text={ADD_COURSE_BUTTON_TEXT} onClick={handleAddCourse} />
				)}
			</header>
			{courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</section>
	);
}

export default Courses;
