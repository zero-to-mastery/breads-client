import rootReducer from '../features/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //for redux to work with async code

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer, //reducers receive state and an action, and then return the new state
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    return store;
}