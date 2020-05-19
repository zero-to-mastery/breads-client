import React from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import { Provider } from 'react-redux'; //makes react and redux connect together
import { configureStore } from '../store';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore(); //the store controls all of the state in app

//persistent jwtToken storage
if (localStorage.jwtToken) { 
    setAuthorizationToken(localStorage.jwtToken);
    //prevent someone from manually tampering with the key of jwtToken in localStorage
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