import React from 'react';
import { shallow } from 'enzyme';
import Timeline from '../components/Timeline';

it('renders without crashing', () => {
    shallow(<Timeline />);
});