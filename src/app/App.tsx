import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import auth from '../features/auth';
import { Navbar } from '../features/notifications';
import Routes from './Routes';
import jwtDecode from 'jwt-decode';

const setCurrentUser = (jwtToken: string): void => {
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
const App: React.FC<{}> = () => (
    <Provider store={store}>
        <Navbar />
        <Routes />
    </Provider>
);

export default App;
export type RootState = ReturnType<typeof store.getState>