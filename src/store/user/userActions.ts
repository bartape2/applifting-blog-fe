import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import userSlice from './userSlice';
import toast from 'react-hot-toast';
import Api from '../../service/Api';
import { User } from '../models';

export const userActions = userSlice.actions;

export const login = (username: string, password: string, callback?: () => void): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        try {
            const response = await Api().post('login', {username, password});
            if (response.status === 200) {
                const user: User = {username, accessToken: response.data.access_token as string};
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(userActions.setUser(user));
                if (callback) {
                    callback();
                }
            } else {
                toast.error(`Login error: ${response.status}`);
            }
            return {username, accessToken: response.data.access_token as string};
        } catch (err: any) {
            if (err.response && err.response.data) {
                console.log(err.response.data);
                toast.error(err.response.data.message || err.response.data.title || 'Unknown error');
            } else {
                toast.error('Unknown error');
            }
        }
    }
}

export const logout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        localStorage.removeItem('user');
        dispatch(userActions.clearUser())
    }
}
