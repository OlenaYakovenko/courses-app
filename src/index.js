import { createRoot } from 'react-dom/client';

// import App from './App';
function App() {
	// eslint-disable-next-line
	return <div>Hello world</div>;
}

const root = createRoot(document.getElementById('root'));

// eslint-disable-next-line
root.render(<App />);
