import React from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) { 
    setAuthorizationToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrentUser({}));
    }
}

const App = () => (
    <Provider store={store}>
        <Navbar />
        <Routes />
    </Provider>
);

export default App;