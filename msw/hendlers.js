import { mockedCoursesList, mockedAuthorsList } from 'constants.js';

import { rest } from 'msw';

const handlers = [
	rest.get('http://localhost:4000/courses/all', (req, res, ctx) =>
		res(
			ctx.json({
				result: mockedCoursesList,
			}),
			ctx.delay(150)
		)
	),
	rest.post('http://localhost:4000/courses/add', (req, res, ctx) =>
		res(
			ctx.json({
				result: {
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
			}),
			ctx.delay(150)
		)
	),

	rest.get('http://localhost:4000/users/me', (req, res, ctx) =>
		res(
			ctx.json({
				result: {
					name: 'Alice',
					email: 'alice@test.com',
					role: 'admin',
				},
			}),
			ctx.delay(150)
		)
	),

	rest.get('http://localhost:4000/authors/all', (req, res, ctx) =>
		res(
			ctx.json({
				result: mockedAuthorsList,
			}),
			ctx.delay(150)
		)
	),
];

export default handlers;
