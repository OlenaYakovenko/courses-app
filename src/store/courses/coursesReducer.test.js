import { setupServer } from 'msw/node';
import setupStore from 'store';
import { mockStore } from 'constants.js';
import handlers from '../../../msw/hendlers';

import coursesReducer, { createCourse, getAllCourses } from './coursesSlice';

const server = setupServer(...handlers);

describe('courseReducer', () => {
	// Enable API mocking before tests.
	beforeAll(() => server.listen());

	// Reset any runtime request handlers we may add during the tests.
	afterEach(() => server.resetHandlers());

	// Disable API mocking after the tests are done.
	afterAll(() => server.close());

	test('should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual({
			courses: [],
			isError: false,
			isSuccess: false,
			isLoading: false,
			message: '',
		});
	});

	test('should handle "createCourse" to an empty list and returns new state', async () => {
		const store = setupStore(mockStore);
		await store.dispatch(
			createCourse({
				title: 'Test course',
				description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
				creationDate: '30/04/2023',
				duration: 240,
				authors: [
					'df32994e-b23d-497c-9e4d-84e4dc02882f',
					'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
				],
			})
		);
		expect(store.getState().courses).toEqual({
			courses: [
				{
					id: 'b5630fdd-7bf7-4d39-b75a-3b5906fd0852',
					title: 'Test course',
					description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
					creationDate: '30/04/2023',
					duration: 240,
					authors: [
						'df32994e-b23d-497c-9e4d-84e4dc02882f',
						'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
					],
				},
			],
			isError: false,
			isSuccess: true,
			isLoading: false,
			message: '',
		});
	});
	test('should handle "createCourse" to an existing list and returns new state', async () => {
		const existingCoursesArr = [
			{
				id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
				title: 'JavaScript',
				description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.`,
				creationDate: '8/3/2021',
				duration: 160,
				authors: [
					'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
					'f762978b-61eb-4096-812b-ebde22838167',
				],
			},
		];
		const store = setupStore({
			...mockStore,
			courses: { ...mockStore.courses, courses: existingCoursesArr },
		});
		await store.dispatch(
			createCourse({
				title: 'Test course',
				description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
				creationDate: '30/04/2023',
				duration: 240,
				authors: [
					'df32994e-b23d-497c-9e4d-84e4dc02882f',
					'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
				],
			})
		);
		expect(store.getState().courses).toEqual({
			courses: [
				{
					id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
					title: 'JavaScript',
					description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.`,
					creationDate: '8/3/2021',
					duration: 160,
					authors: [
						'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
						'f762978b-61eb-4096-812b-ebde22838167',
					],
				},
				{
					id: 'b5630fdd-7bf7-4d39-b75a-3b5906fd0852',
					title: 'Test course',
					description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
					creationDate: '30/04/2023',
					duration: 240,
					authors: [
						'df32994e-b23d-497c-9e4d-84e4dc02882f',
						'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
					],
				},
			],
			isError: false,
			isSuccess: true,
			isLoading: false,
			message: '',
		});
	});

	test('should handle "getAllCourses" and returns new state', async () => {
		const store = setupStore(mockStore);
		await store.dispatch(getAllCourses());
		expect(store.getState().courses).toEqual({
			courses: [
				{
					id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
					title: 'JavaScript',
					description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.`,
					creationDate: '8/3/2021',
					duration: 160,
					authors: [
						'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
						'f762978b-61eb-4096-812b-ebde22838167',
					],
				},
				{
					id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
					title: 'Angular',
					description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
					creationDate: '10/11/2020',
					duration: 210,
					authors: [
						'df32994e-b23d-497c-9e4d-84e4dc02882f',
						'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
					],
				},
			],
			isError: false,
			isSuccess: true,
			isLoading: false,
			message: '',
		});
	});
});
