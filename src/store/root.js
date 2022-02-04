/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { useSelector, useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const middleWares = [thunk];

const enhancer = process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleWares))
    : compose(applyMiddleware(...middleWares));

const store = createStore(rootReducer,
enhancer
    );
export default store;
