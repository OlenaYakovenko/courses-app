import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from 'common';

import {
	CREATE_COURSE_BUTTON_TEXT,
	DESCRIPTION_LABEL_TEXT,
	DESCRIPTION_PLACEHOLDER_TEXT,
	TITLE_INPUT_LABEL_TEXT,
	TITLE_INPUT_PLACEHOLDER_TEXT,
	mockedAuthorsList,
	mockedCoursesList,
} from 'constants.js';

import dateGenerator from 'helpers/dateGenerator';

import styles from 'components/CreateCourse/CreateCourse.module.css';
import AddAuthor from './AddAuthor';
import AllAuthors from './AllAuthors';
import CourseDuration from './CourseDuration';
import CourseAuthors from './CourseAuthors';

function CreateCourse() {
	const [courseTitle, setCourseTitle] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');

	const navigation = useNavigate();

	const handleTitle = useCallback(
		(e) => {
			setCourseTitle(e.target.value);
		},
		[setCourseTitle]
	);

	const handleDescription = useCallback(
		(e) => setDescriptionText(e.target.value),
		[setDescriptionText]
	);

	const handleCreateCourse = useCallback(
		(e) => {
			e.preventDefault();
			const courseID = uuidv4();

			const createdCourse = {
				id: courseID,
				title: courseTitle,
				description: descriptionText,
				creationDate: dateGenerator(),
				duration: courseDuration,
				authors: courseAuthorsList.map(({ id }) => id),
			};

			const { title, description, duration, authors } = createdCourse;
			if (!title || !description || !duration || authors.length < 1) {
				alert('Please, fill in all fields');
			} else if (description.length < 2) {
				alert('Description is too short');
			} else if (duration < 1) {
				alert('Duration has to be more than zero');
			} else {
				mockedCoursesList.push(createdCourse);
				navigation('/courses');
			}
		},
		[
			courseAuthorsList,
			courseDuration,
			courseTitle,
			descriptionText,
			navigation,
		]
	);

	const inputTitleProps = {
		id: 'title',
		placeholderText: TITLE_INPUT_PLACEHOLDER_TEXT,
		labelText: TITLE_INPUT_LABEL_TEXT,
		required: true,
		value: courseTitle,
		onChange: handleTitle,
	};

	const descriptionProps = {
		name: 'description',
		id: 'description',
		placeholder: DESCRIPTION_PLACEHOLDER_TEXT,
		cols: '30',
		rows: '10',
		value: descriptionText,
		minLength: '2',
		required: true,
		onChange: handleDescription,
	};

	return (
		<section>
			<form className={styles['create-course-form']}>
				<div className={styles['form-header']}>
					<Input {...inputTitleProps} />
					<Button
						type='submit'
						text={CREATE_COURSE_BUTTON_TEXT}
						onClick={handleCreateCourse}
					/>
				</div>
				<div className={styles['form-textarea']}>
					<label htmlFor='description'>{DESCRIPTION_LABEL_TEXT}</label>
					<textarea {...descriptionProps} />
				</div>
				<div className={styles['form-grid']}>
					<AddAuthor
						setAuthorsList={setAuthorsList}
						authorsList={authorsList}
					/>
					<AllAuthors
						authorsList={authorsList}
						setAuthorsList={setAuthorsList}
						courseAuthorsList={courseAuthorsList}
						setCourseAuthorsList={setCourseAuthorsList}
					/>
					<CourseDuration
						courseDuration={courseDuration}
						setCourseDuration={setCourseDuration}
					/>
					<CourseAuthors
						courseAuthorsList={courseAuthorsList}
						setAuthorsList={setAuthorsList}
						setCourseAuthorsList={setCourseAuthorsList}
						authorsList={authorsList}
					/>
				</div>
			</form>
		</section>
	);
}

export default CreateCourse;
