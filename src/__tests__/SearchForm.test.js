import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SearchForm from '../containers/SearchForm';

const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
    const historyMock = { push: jest.fn(), listen: jest.fn() };
    const props = {
        errors: 'test'
    }
    shallow(
        <Provider store={store}>
            <SearchForm history={historyMock} {...props}/>
        </Provider>
    );
});