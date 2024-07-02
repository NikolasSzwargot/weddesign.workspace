import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
