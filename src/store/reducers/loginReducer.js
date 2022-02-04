
import { LOGIN_FAILED, LOGIN_SUCCESS } from '../constant';

const initialState = {
    token: '',
    message: '',
    email: '',
    password: ''
};

// eslint-disable-next-line consistent-return
const loginCheck = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            state.token = action.payload;
            return state;
        case LOGIN_FAILED:
            state.message = action.payload;
            return state;
        default: return state;
    }
};

export default loginCheck;
