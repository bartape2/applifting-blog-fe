import { configureStore } from '@reduxjs/toolkit';
import articleListSlice from './articleList/articleListSlice';
import imagesSlice from './images/imagesSlice';
import userSlice from './user/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        articles: articleListSlice.reducer,
        images: imagesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
