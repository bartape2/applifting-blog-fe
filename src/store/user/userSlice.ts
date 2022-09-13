import { getEmptyUserObject, User } from '../models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const storedUserString = localStorage.getItem('user');
const initialUserState: User = storedUserString ? JSON.parse(storedUserString) : getEmptyUserObject();

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {

        setUser(state, action: PayloadAction<User>) {
            return action.payload;
        },

        clearUser(state) {
            return getEmptyUserObject();
        }
    }
});

export default userSlice;