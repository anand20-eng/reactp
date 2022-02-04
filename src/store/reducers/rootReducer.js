import { combineReducers } from 'redux';
import authentication from './firstReducerAuthentication';
import loginCheck from './loginReducer';

const rootReducer = combineReducers({
    firstReducerAuthentication: authentication,
    loginReducer: loginCheck,
});


export default rootReducer;
