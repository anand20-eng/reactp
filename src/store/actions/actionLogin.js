
import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from '../constant';


export const loginAction = (credential) => {
    return function (dispatch) {
        dispatch(loginStart());
        axios.post('http://localhost:4000/users/authenticate', credential).then(response => {
            console.log('res--', response.data);
            dispatch(loginSuccess(response.data.token));
        }).catch(error => {
            dispatch(loginFailed(error.response.data.message));
            toast.error(error.response);
        });
    };
};

export const loginStart = () => ({ type: LOGIN_START });

export const loginSuccess = (message) =>
    ({ type: LOGIN_SUCCESS, payload: message });

export const loginFailed = (message) =>
    ({ type: LOGIN_FAILED, payload: message });
