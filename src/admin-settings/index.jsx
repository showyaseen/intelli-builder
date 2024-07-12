import { createRoot } from '@wordpress/element';
import App from './App';

console.log('intellibuilderSettings', intellibuilderSettings);

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('intellibuilder-admin-settings');
    if (rootElement) {
        createRoot(rootElement).render(<App />);
    }
});
