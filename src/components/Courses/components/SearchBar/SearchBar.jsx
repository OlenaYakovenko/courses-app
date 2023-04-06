import PropTypes from 'prop-types';

import { Button, Input } from 'common';
import {
	SEARCH_BUTTON_TEXT,
	SEARCH_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';

import styles from 'components/Courses/components/SearchBar/SearchBar.module.css';

function SearchBar({ searchTerm, handleSearch, handleInputChange }) {
	return (
		<div className={styles['search-bar']}>
			<Input
				placeholderText={SEARCH_INPUT_PLACEHOLDER_TEXT}
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<Button
				text={SEARCH_BUTTON_TEXT}
				onClick={() => handleSearch(searchTerm)}
			/>
		</div>
	);
}

SearchBar.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	handleSearch: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
};

export default SearchBar;
