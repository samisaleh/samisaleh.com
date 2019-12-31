import React from 'react';
import App from '../src/App';
import { create } from 'react-test-renderer';

describe('<App />', () => {
    it('Matches snapshot', () => {
        const app = create(<App />);
        expect(app.toJSON()).toMatchSnapshot();
    });
});
