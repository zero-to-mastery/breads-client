import React from 'react';
import Navbar from '../features/notifications/Navbar';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import auth from '../features/auth';
// import { setAuthorizationToken, setCurrentUser } from '../features/auth';
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