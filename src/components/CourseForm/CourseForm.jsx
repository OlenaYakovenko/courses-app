import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createCourse, updateCourse } from 'store/courses/coursesSlice';

import { Button, Input } from 'common';

import {
	CREATE_COURSE_BUTTON_TEXT,
	UPDATE_COURSE_BUTTON_TEXT,
	DESCRIPTION_LABEL_TEXT,
	DESCRIPTION_PLACEHOLDER_TEXT,
	TITLE_INPUT_LABEL_TEXT,
	TITLE_INPUT_PLACEHOLDER_TEXT,
} from 'constants.js';
import selectCourses from 'store/courses/coursesSelectors';

import dateGenerator from 'helpers/dateGenerator';

import AddAuthor from './AddAuthor';
import AllAuthors from './AllAuthors';
import CourseDuration from './CourseDuration';
import CourseAuthors from './CourseAuthors';

import styles from './CourseForm.module.css';

function CourseForm({ mode }) {
	const [courseTitle, setCourseTitle] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');
	const [creationDate, setCreationDate] = useState('');

	const dispatch = useDispatch();

	const navigation = useNavigate();
	const courses = useSelector(selectCourses);

	const { courseId } = useParams();
	useEffect(() => {
		if (mode === 'update') {
			const courseToBeUpdated = courses.find(({ id }) => id === courseId);
			const {
				title,
				description,
				authors,
				duration,
				creationDate: created,
			} = courseToBeUpdated;
			setCourseTitle(title);
			setDescriptionText(description);
			setCourseAuthorsList(authors);
			setCourseDuration(duration);
			setCreationDate(created);
		}
	}, [mode, courses, courseId]);

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

	const handleCourse = useCallback(
		(e) => {
			e.preventDefault();

			const currentCourse = {
				title: courseTitle,
				description: descriptionText,
				creationDate: creationDate || dateGenerator(),
				duration: courseDuration,
				authors: courseAuthorsList,
			};

			const { title, description, duration, authors } = currentCourse;
			if (!title || !description || !duration || authors.length < 1) {
				alert('Please, fill in all fields');
			} else if (description.length < 2) {
				alert('Description is too short');
			} else if (duration < 1) {
				alert('Duration has to be more than zero');
			} else {
				if (mode === 'create') {
					dispatch(createCourse(currentCourse));
				}
				if (mode === 'update') {
					dispatch(updateCourse({ courseId, currentCourse }));
				}
				navigation('/courses');
			}
		},
		[
			courseAuthorsList,
			courseDuration,
			courseTitle,
			descriptionText,
			navigation,
			dispatch,
			mode,
			courseId,
			creationDate,
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
		<section data-testid='courseFormComponent'>
			<form className={styles['create-course-form']}>
				<div className={styles['form-header']}>
					<Input {...inputTitleProps} />
					<Button
						type='submit'
						text={
							mode === 'create'
								? CREATE_COURSE_BUTTON_TEXT
								: UPDATE_COURSE_BUTTON_TEXT
						}
						onClick={handleCourse}
					/>
				</div>
				<div className={styles['form-textarea']}>
					<label htmlFor='description'>{DESCRIPTION_LABEL_TEXT}</label>
					<textarea {...descriptionProps} />
				</div>
				<div className={styles['form-grid']}>
					<AddAuthor />
					<AllAuthors
						courseAuthorsList={courseAuthorsList}
						setCourseAuthorsList={setCourseAuthorsList}
					/>
					<CourseDuration
						courseDuration={courseDuration}
						setCourseDuration={setCourseDuration}
					/>
					<CourseAuthors
						courseAuthorsList={courseAuthorsList}
						setCourseAuthorsList={setCourseAuthorsList}
					/>
				</div>
			</form>
		</section>
	);
}

export default CourseForm;
