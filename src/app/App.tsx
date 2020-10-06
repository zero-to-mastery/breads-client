import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import auth from '../features/auth';
import { Navbar } from '../features/notifications';
import Routes from './Routes';
import jwtDecode from 'jwt-decode';

const store: any = configureStore();

const setCurrentUser: any = (jwtToken: string) => {
    if (jwtToken) { 
        auth.actions.setAuthorizationToken(jwtToken);
        try {
            store.dispatch(auth.actions.setCurrentUser(jwtDecode(jwtToken)));
        } catch (err) {
            store.dispatch(auth.actions.setCurrentUser({}));
        }
    }
}

setCurrentUser(localStorage.jwtToken);

/**Initializes the Breads app. */
const App: React.FC = () => (
    <Provider store={store}>
        <Navbar />
        <Routes />
    </Provider>
);

export default App;