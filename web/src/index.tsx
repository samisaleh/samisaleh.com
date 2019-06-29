import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom/';
import App from './App';

import './styles/index.scss';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#root'),
);
