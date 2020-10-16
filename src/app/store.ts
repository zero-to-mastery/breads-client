import rootReducer from '../features/rootReducer';
import { createStore, applyMiddleware, compose, Store, Action } from 'redux';
import thunk from 'redux-thunk';

/** 
 * Creates redux store. 
 * @param {object} reducer - The root reducer of the app.
 * @param {function} enhancer - Uses redux compose in production or redux devtools compose in development.
 * @param {function} middleware - Adds middleware to the store.
 * @see {@link https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript|Stack Overflow}
 * */
const configureStore = (reducer: any, enhancer: any, middleware: any): Store<any, any> => {
    const store: Store<unknown, Action<any>> = createStore(
        reducer,
        enhancer(
            applyMiddleware(middleware)
        )
    );
    return store;
}

const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<any, any> = configureStore(rootReducer, composeEnhancers, thunk);

export type AppDispatch = typeof store.dispatch;
export default store;