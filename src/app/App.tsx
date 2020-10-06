import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import auth from '../features/auth';
import { Navbar } from '../features/notifications';
import Routes from './Routes';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) { 
    auth.actions.setAuthorizationToken(localStorage.jwtToken);
    try {
        store.dispatch(auth.actions.setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(auth.actions.setCurrentUser({}));
    }
}

const App = () => (
    <Provider store={store}>
        <Navbar />
        <Routes />
    </Provider>
);

export default App;