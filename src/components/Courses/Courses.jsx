import { useState, useEffect } from 'react';

import {
	mockedCoursesList,
	mockedAuthorsList,
	ADD_COURSE_BUTTON_TEXT,
} from 'constants.js';
import { Button } from 'common';
import { CourseCard, SearchBar } from 'components/Courses/components';

import styles from 'components/Courses/Courses.module.css';

function Courses({ setIsAddingCourse }) {
	const [courses, setCourses] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setCourses(mockedCoursesList);
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value.trim();
		if (!value) {
			setCourses(mockedCoursesList);
		}
		setSearchTerm(value);
	};

	const handleSearch = (query) => {
		if (!query) {
			setSearchTerm('');
		} else {
			const newCourses = mockedCoursesList.filter(
				({ id, title }) =>
					id.toLowerCase().includes(query.toLowerCase()) ||
					title.toLowerCase().includes(query.toLowerCase())
			);
			setCourses(newCourses);
		}
	};

	return (
		<section>
			<header className={styles['courses-header']}>
				<SearchBar
					handleSearch={handleSearch}
					handleInputChange={handleInputChange}
					searchTerm={searchTerm}
				/>
				<Button
					text={ADD_COURSE_BUTTON_TEXT}
					onClick={() => setIsAddingCourse(true)}
				/>
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
