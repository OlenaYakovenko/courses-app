import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Input } from 'common';
import {
	CREATE_AUTHOR_BUTTON_TEXT,
	AUTHOR_LABEL_TEXT,
	AUTHOR_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';

import { createAuthor } from 'store/authors/authorsSlice';
import styles from './AddAuthor.module.css';

function AddAuthor() {
	const [newAuthorName, setNewAuthorName] = useState('');
	const dispatch = useDispatch();

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
		const newAuthor = { name: newAuthorName };

		dispatch(createAuthor(newAuthor));
		setNewAuthorName('');
	}, [dispatch, newAuthorName]);

	return (
		<fieldset className={styles['form-add']} data-testid='newAuthor'>
			<legend>Add author</legend>
			<Input
				id='author'
				placeholderText={AUTHOR_INPUT_PLACEHOLDER_TEXT}
				labelText={AUTHOR_LABEL_TEXT}
				value={newAuthorName}
				onChange={handleAuthorName}
			/>
			<div className={styles['btn-container']}>
				<Button
					text={CREATE_AUTHOR_BUTTON_TEXT}
					onClick={handleCreateAuthor}
					data-testid='createAuthor'
				/>
			</div>
		</fieldset>
	);
}

export default AddAuthor;
