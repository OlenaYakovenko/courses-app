import { useCallback, useState } from 'react';

import { Button, Input } from 'common';
import {
	SEARCH_BUTTON_TEXT,
	SEARCH_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';

import { useDispatch, useSelector } from 'react-redux';
import selectCourses from 'store/courses/coursesSelectors';
import { setCourses } from 'store/courses/coursesSlice';
import styles from './SearchBar.module.css';

function SearchBar() {
	const [allCourses, setAllCourses] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const courses = useSelector(selectCourses);

	const dispatch = useDispatch();

	const handleInputChange = useCallback(
		(e) => {
			const value = e.target.value.trim();
			if (!value) {
				dispatch(setCourses(allCourses));
			}
			setSearchTerm(value);
		},
		[dispatch, allCourses]
	);

	const handleSearch = useCallback(() => {
		const query = searchTerm;
		if (!query) {
			setSearchTerm('');
		} else {
			const newCourses = courses.filter(
				({ id, title }) =>
					id.toLowerCase().includes(query.toLowerCase()) ||
					title.toLowerCase().includes(query.toLowerCase())
			);
			setAllCourses(courses);
			dispatch(setCourses(newCourses));
		}
	}, [dispatch, courses, searchTerm]);

	return (
		<div className={styles['search-bar']}>
			<Input
				placeholderText={SEARCH_INPUT_PLACEHOLDER_TEXT}
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<Button text={SEARCH_BUTTON_TEXT} onClick={handleSearch} />
		</div>
	);
}

export default SearchBar;
