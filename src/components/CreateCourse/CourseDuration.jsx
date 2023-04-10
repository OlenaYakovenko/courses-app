import { Input } from 'common';
import {
	DURATION_INPUT_LABEL_TEXT,
	DURATION_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';
import pipeDuration from 'helpers/pipeDuration';
import styles from './CourseDuration.module.css';

function CourseDuration({ courseDuration, setCourseDuration }) {
	const handleDuration = (e) => {
		const value = +e.target.value;
		if (!value) {
			setCourseDuration(0);
		} else {
			setCourseDuration(value);
		}
	};
	return (
		<fieldset className={styles['form-duration']}>
			<legend>Duration</legend>
			<Input
				id='duration'
				type='number'
				placeholderText={DURATION_INPUT_PLACEHOLDER_TEXT}
				labelText={DURATION_INPUT_LABEL_TEXT}
				onChange={handleDuration}
				required
			/>
			<p className={styles['duration-info']}>
				Duration <span>{` ${pipeDuration(courseDuration)} `}</span> hours
			</p>
		</fieldset>
	);
}
export default CourseDuration;
