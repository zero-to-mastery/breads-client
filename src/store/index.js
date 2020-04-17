import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //for redux to work with async code

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer, //reducers receive state and an action, and then return the new state
        composeEnhancers(
        // compose(
            applyMiddleware(thunk)
            // ,
            //window.devToolsExtension ? window.devToolsExtension() : f => f
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //evaluates to undefined with Jest
        )
    );
    return store;
}