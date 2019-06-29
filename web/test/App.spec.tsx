import './DOMSetup';

import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import App from '../src/App';

describe('<App />', () => {
    it('Mounts without imploding with no props', () => {
        const app = mount(<App />);
        expect(app.props()).to.be.an('object').that.is.empty;
    });
});
