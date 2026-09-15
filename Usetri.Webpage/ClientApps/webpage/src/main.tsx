import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './translation/i18n.js';

createRoot(document.getElementById('root')!).render(<App />);
