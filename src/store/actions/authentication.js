import axios from 'axios';
import { toast } from 'react-toastify';
import { REGISTRATION_FAILED, REGISTRATION_START, REGISTRATION_SUCCESS } from '../constant';

export const registrationActionThunk = (user) => {
    return function (dispatch) {
        dispatch(registrationStart());
        axios.post('http://localhost:4000/users/register', user).then((response) => {
            dispatch(registrationSuccess(response.data.message));
        }).catch((error) => {
            toast.error(error.response.data.message);
            dispatch(registrationFailed(error.response.data.message));
        });
    };
};

export const registrationStart = () => ({ type: REGISTRATION_START });

export const registrationSuccess = (message) => ({ type: REGISTRATION_SUCCESS, payload: message });

export const registrationFailed = (message) => ({ type: REGISTRATION_FAILED, payload: message });
