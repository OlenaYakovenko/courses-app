import renderWithProviders from 'helpers/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { mockStore } from 'constants.js';
import Header from './Header';

describe('Header component', () => {
	test('should have logo and user name', () => {
		renderWithProviders(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
			{ preloadedState: mockStore }
		);
		expect(screen.getByTestId(/headerUserName/i)).toBeInTheDocument();
		expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
	});
});
