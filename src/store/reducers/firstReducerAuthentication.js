import { REGISTRATION_FAILED, REGISTRATION_SUCCESS } from '../constant';

const initialState = {
    token: '',
    message: '',
    email: '',
    password: ''
};

// eslint-disable-next-line consistent-return
const authentication = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            state.message = action.payload;
            return state;
        case REGISTRATION_FAILED:
            state.message = action.payload;
            return state;
        default: return state;
    }
};

export default authentication;
