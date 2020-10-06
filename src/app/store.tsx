import rootReducer from '../features/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

/** 
 * Creates redux store using rootReducer and applyMiddleware. 
 * @const composeEnhancers {function} Uses redux compose in production or redux devtools compose in development
 * @see https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript.
 * */
export const configureStore = (): any => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    return store;
}