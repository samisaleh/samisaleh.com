import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom/';
import App from './App';

import './styles/index.scss';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: 'GTM-MT5MPGN',
};

TagManager.initialize(tagManagerArgs);

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#root'),
);
