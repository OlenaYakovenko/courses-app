import { useState } from 'react';
import { Courses, CreateCourse, Header } from './components';

import './App.css';

function App() {
	const [isAddingCourse, setIsAddingCourse] = useState(false);
	return (
		<div className='wrapper'>
			<Header />
			<main className='main'>
				{isAddingCourse ? (
					<CreateCourse setIsAddingCourse={setIsAddingCourse} />
				) : (
					<Courses setIsAddingCourse={setIsAddingCourse} />
				)}
			</main>
		</div>
	);
}

export default App;
