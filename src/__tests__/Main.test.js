import React from 'react';
import { shallow } from 'enzyme';
import Main from '../containers/Main';

it('renders without crashing', () => {
    shallow(<Main />);
});