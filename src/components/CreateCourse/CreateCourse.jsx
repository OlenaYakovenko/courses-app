import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from 'common';

import {
	CREATE_COURSE_BUTTON_TEXT,
	AUTHOR_INPUT_PLACEHOLDER_TEXT,
	AUTHOR_LABEL_TEXT,
	ADD_AUTHOR_BUTTON_TEXT,
	CREATE_AUTHOR_BUTTON_TEXT,
	DELETE_AUTHOR_BUTTON_TEXT,
	DESCRIPTION_LABEL_TEXT,
	DESCRIPTION_PLACEHOLDER_TEXT,
	TITLE_INPUT_LABEL_TEXT,
	TITLE_INPUT_PLACEHOLDER_TEXT,
	DURATION_INPUT_LABEL_TEXT,
	DURATION_INPUT_PLACEHOLDER_TEXT,
	mockedAuthorsList,
	mockedCoursesList,
} from 'constants.js';

import pipeDuration from 'helpers/pipeDuration';
import dateGenerator from 'helpers/dateGenerator';

import styles from 'components/CreateCourse/CreateCourse.module.css';

function CreateCourse() {
	const [courseTitle, setCourseTitle] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	const [newAuthorName, setNewAuthorName] = useState('');
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseDuration, setCourseDuration] = useState(0);

	const navigation = useNavigate();

	const handleTitle = (e) => {
		const title = e.target.value;
		setCourseTitle(title);
	};

	const handleAuthorName = (e) => {
		const authorName = e.target.value;
		setNewAuthorName(authorName);
	};

	const handleCreateAuthor = () => {
		if (!newAuthorName) {
			return;
		}
		const authorID = uuidv4();
		const newAuthor = { id: authorID, name: newAuthorName };
		const newAuthorsList = [...mockedAuthorsList, newAuthor];
		setAuthorsList(newAuthorsList);
		setNewAuthorName('');
		mockedAuthorsList.push(newAuthor);
	};

	const handleAddAuthor = (authorID) => {
		const currentAuthor = authorsList.find(({ id }) => id === authorID);
		const newCourseAuthorsList = [...courseAuthorsList, currentAuthor];
		const leftAuhtors = authorsList.filter(({ id }) => id !== authorID);
		setCourseAuthorsList(newCourseAuthorsList);
		setAuthorsList(leftAuhtors);
	};

	const handleDeleteAuthor = (authorID) => {
		const authorToBeDeleted = courseAuthorsList.find(
			({ id }) => id === authorID
		);
		const leftCourseAuthors = courseAuthorsList.filter(
			({ id }) => id !== authorID
		);
		const newAuthorsList = [...authorsList, authorToBeDeleted];
		setAuthorsList(newAuthorsList);
		setCourseAuthorsList(leftCourseAuthors);
	};

	const handleDuration = (e) => {
		const value = +e.target.value;
		if (!value) {
			setCourseDuration(0);
		} else {
			setCourseDuration(value);
		}
	};

	const handleCreateCourse = (e) => {
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
	};

	return (
		<section>
			<form className={styles['create-course-form']}>
				<div className={styles['form-header']}>
					<Input
						id='title'
						placeholderText={TITLE_INPUT_PLACEHOLDER_TEXT}
						labelText={TITLE_INPUT_LABEL_TEXT}
						required
						value={courseTitle}
						onChange={handleTitle}
					/>
					<Button
						type='submit'
						text={CREATE_COURSE_BUTTON_TEXT}
						onClick={handleCreateCourse}
					/>
				</div>
				<div className={styles['form-textarea']}>
					<label htmlFor='description'>{DESCRIPTION_LABEL_TEXT}</label>
					<textarea
						name='description'
						id='description'
						placeholder={DESCRIPTION_PLACEHOLDER_TEXT}
						cols='30'
						rows='10'
						value={descriptionText}
						minLength='2'
						required
						onChange={(e) => setDescriptionText(e.target.value)}
					/>
				</div>
				<div className={styles['form-grid']}>
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
							<Button
								text={CREATE_AUTHOR_BUTTON_TEXT}
								onClick={handleCreateAuthor}
							/>
						</div>
					</fieldset>
					<fieldset className={styles['form-authors']}>
						<legend>Authors</legend>
						{authorsList.map((author) => (
							<p key={author.id} className={styles.author}>
								<span>{author.name}</span>
								<Button
									text={ADD_AUTHOR_BUTTON_TEXT}
									onClick={() => handleAddAuthor(author.id)}
								/>
							</p>
						))}
					</fieldset>
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
					<fieldset>
						<legend>Course authors</legend>
						{courseAuthorsList.length > 0 ? (
							courseAuthorsList.map((author) => (
								<p key={author.id} className={styles.author}>
									<span>{author.name}</span>
									<Button
										text={DELETE_AUTHOR_BUTTON_TEXT}
										onClick={() => handleDeleteAuthor(author.id)}
									/>
								</p>
							))
						) : (
							<p>Author list is empty</p>
						)}
					</fieldset>
				</div>
			</form>
		</section>
	);
}

export default CreateCourse;
