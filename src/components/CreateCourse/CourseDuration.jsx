import { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { Input } from 'common';
import {
	DURATION_INPUT_LABEL_TEXT,
	DURATION_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';
import pipeDuration from 'helpers/pipeDuration';

import styles from './CourseDuration.module.css';

function CourseDuration({ courseDuration, setCourseDuration }) {
	const handleDuration = useCallback(
		(e) => {
			const value = +e.target.value;
			if (!value) {
				setCourseDuration('');
			} else {
				setCourseDuration(value);
			}
		},
		[setCourseDuration]
	);
	return (
		<fieldset className={styles['form-duration']}>
			<legend>Duration</legend>
			<Input
				id='duration'
				type='number'
				placeholderText={DURATION_INPUT_PLACEHOLDER_TEXT}
				labelText={DURATION_INPUT_LABEL_TEXT}
				value={courseDuration}
				onChange={handleDuration}
				required
			/>
			<p className={styles['duration-info']}>
				Duration <span>{` ${pipeDuration(courseDuration)} `}</span> hours
			</p>
		</fieldset>
	);
}

CourseDuration.propTypes = {
	courseDuration: PropTypes.string.isRequired,
	setCourseDuration: PropTypes.func.isRequired,
};
export default CourseDuration;
