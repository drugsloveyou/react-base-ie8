import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import test from './test/testReducer';

let store = createStore(
    combineReducers({
        test
    }),
    applyMiddleware(thunk)
);

export default store;