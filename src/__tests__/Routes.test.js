import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Routes from '../containers/Routes';

const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
    shallow(
        <Provider store={store}>
            <Routes />
        </Provider>
    );
});