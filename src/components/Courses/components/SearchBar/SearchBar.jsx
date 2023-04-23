import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from 'common';
import {
	mockedCoursesList,
	SEARCH_BUTTON_TEXT,
	SEARCH_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';

import styles from './SearchBar.module.css';

function SearchBar({ setCourses }) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = useCallback(
		(e) => {
			const value = e.target.value.trim();
			if (!value) {
				setCourses(mockedCoursesList);
			}
			setSearchTerm(value);
		},
		[setCourses]
	);

	const handleSearch = useCallback(() => {
		const query = searchTerm;
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
	}, [searchTerm, setCourses]);

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

SearchBar.propTypes = {
	setCourses: PropTypes.func.isRequired,
};

export default SearchBar;
