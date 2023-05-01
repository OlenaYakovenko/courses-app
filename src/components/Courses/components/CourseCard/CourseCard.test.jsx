import renderWithProviders from 'helpers/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { mockedAuthorsList, mockStore } from 'constants.js';
import { CourseCard } from '..';

describe('CourseCard component', () => {
	const course = {
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	};

	const setup = () => {
		const storeWithAuthors = {
			...mockStore,
			authors: {
				...mockStore.authors,
				authors: mockedAuthorsList,
			},
		};
		const utils = renderWithProviders(
			<BrowserRouter>
				<CourseCard {...course} />
			</BrowserRouter>,
			{ preloadedState: storeWithAuthors }
		);
		return { ...utils };
	};

	test('should display title', () => {
		const { getByTestId } = setup();
		expect(getByTestId(/courseTitle/i)).toHaveTextContent('JavaScript');
	});

	test('should display description', () => {
		const { getByTestId } = setup();
		expect(getByTestId(/courseDescription/i)).toHaveTextContent(
			`${course.description}`
		);
	});

	test('should display duration in the correct format', () => {
		const { getByTestId } = setup();
		expect(getByTestId(/courseDuration/i)).toHaveTextContent('02:40 hours');
	});

	test('should display authors list', () => {
		const { getByText } = setup();
		expect(getByText(/Vasiliy Dobkin/i)).toBeInTheDocument();
	});

	test('should display created date in the correct format', () => {
		const { getByText } = setup();
		expect(getByText('8/3/2021')).toBeInTheDocument();
	});
});
