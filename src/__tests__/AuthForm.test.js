import React from 'react';
import { shallow } from 'enzyme';
import AuthForm from '../components/AuthForm';

it('renders without crashing', () => {
    const historyMock = { push: jest.fn(), listen: jest.fn() };
    const props = {
        errors: 'test'
    }
    shallow(<AuthForm history={historyMock} {...props}/>);
});