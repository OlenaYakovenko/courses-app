import { useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from 'common';
import {
	CREATE_AUTHOR_BUTTON_TEXT,
	AUTHOR_LABEL_TEXT,
	mockedAuthorsList,
	AUTHOR_INPUT_PLACEHOLDER_TEXT,
} from 'constants';

import styles from './AddAuthor.module.css';

function AddAuthor({ setAuthorsList, authorsList }) {
	const [newAuthorName, setNewAuthorName] = useState('');

	const handleAuthorName = useCallback(
		(e) => {
			const authorName = e.target.value;
			setNewAuthorName(authorName);
		},
		[setNewAuthorName]
	);

	const handleCreateAuthor = useCallback(() => {
		if (!newAuthorName) {
			return;
		}
		const authorID = uuidv4();
		const newAuthor = { id: authorID, name: newAuthorName };
		const newAuthorsList = [...authorsList, newAuthor];
		setAuthorsList(newAuthorsList);
		setNewAuthorName('');
		mockedAuthorsList.push(newAuthor);
	}, [setAuthorsList, newAuthorName, authorsList]);

	return (
		<fieldset className={styles['form-add']}>
			<legend>Add author</legend>
			<Input
				id='author'
				placeholderText={AUTHOR_INPUT_PLACEHOLDER_TEXT}
				labelText={AUTHOR_LABEL_TEXT}
				value={newAuthorName}
				onChange={handleAuthorName}
			/>
			<div className={styles['btn-container']}>
				<Button text={CREATE_AUTHOR_BUTTON_TEXT} onClick={handleCreateAuthor} />
			</div>
		</fieldset>
	);
}

AddAuthor.propTypes = {
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	setAuthorsList: PropTypes.func.isRequired,
};
export default AddAuthor;
