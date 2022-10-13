import {  LOAD_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER_SUCCESS, USER_FAILED, USER_REQUEST } from './userType';

export default function (state, action) {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                isLoggedOut: false,
                user: action.payload,
            }
        case USER_FAILED:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                isLoggedOut: false,
                error: action.payload
            }
     case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                isLoggedOut: false,
                user: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                isLoggedOut: true,
                user: null,
            }
        default:
            return state;
    }
}