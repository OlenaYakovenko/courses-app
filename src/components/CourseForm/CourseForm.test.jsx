import { cleanup, fireEvent, screen } from '@testing-library/react';
import {
	ADD_AUTHOR_BUTTON_TEXT,
	DELETE_AUTHOR_BUTTON_TEXT,
	mockedAuthorsList,
	mockStore,
} from 'constants.js';

import renderWithProviders from 'helpers/test-utils';
import { BrowserRouter } from 'react-router-dom';

import setupStore from 'store';
import CourseForm from './CourseForm';

describe('CourseForm component', () => {
	const stateWithAuthors = {
		...mockStore,
		authors: {
			...mockStore.authors,
			authors: mockedAuthorsList,
		},
	};
	test('should show all authors list', () => {
		renderWithProviders(
			<BrowserRouter>
				<CourseForm mode='create' />
			</BrowserRouter>,
			{
				preloadedState: stateWithAuthors,
			}
		);
		expect(screen.getByTestId('allAuthorsList')).toHaveTextContent('Authors');
		expect(screen.getAllByTestId('allAuthorsName').length).toEqual(
			+`${mockedAuthorsList.length}`
		);
	});

	test('"Create author" click button should call dispatch', () => {
		const makeTestStore = () => {
			const store = setupStore(stateWithAuthors);
			const origDispatch = store.dispatch;
			store.dispatch = jest.fn(origDispatch);
			return store;
		};
		const store = makeTestStore();
		renderWithProviders(
			<BrowserRouter>
				<CourseForm mode='create' />
			</BrowserRouter>,
			{
				store,
			}
		);

		expect(screen.getByTestId('createAuthor')).toBeInTheDocument();
		fireEvent.change(screen.getByLabelText('Author name'), {
			target: { value: 'AUTHOR' },
		});
		fireEvent.click(screen.getByTestId('createAuthor'));
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		cleanup();
	});

	test('"Add author" button click should add an author to course authors list', () => {
		renderWithProviders(
			<BrowserRouter>
				<CourseForm mode='create' />
			</BrowserRouter>,
			{
				preloadedState: stateWithAuthors,
			}
		);

		expect(screen.queryByTestId('courseAuthorName')).toBeNull();
		fireEvent.click(screen.getAllByText(`${ADD_AUTHOR_BUTTON_TEXT}`)[0]);
		expect(screen.getByTestId('courseAuthorName')).toBeInTheDocument();
	});

	test('"Delete author" button click should delete an author from the course list', () => {
		renderWithProviders(
			<BrowserRouter>
				<CourseForm mode='create' />
			</BrowserRouter>,
			{
				preloadedState: stateWithAuthors,
			}
		);

		expect(screen.queryByTestId('courseAuthorName')).toBeNull();
		fireEvent.click(screen.getAllByText(`${ADD_AUTHOR_BUTTON_TEXT}`)[0]);
		expect(screen.getByTestId('courseAuthorName')).toBeInTheDocument();
		fireEvent.click(screen.getByText(`${DELETE_AUTHOR_BUTTON_TEXT}`));
		expect(screen.getByText('Author list is empty')).toBeInTheDocument();
	});
});
