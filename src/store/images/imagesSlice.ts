import { Image } from '../models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialImagesState: Image[] = [];

const imagesSlice = createSlice({
    name: 'images',
    initialState: initialImagesState,
    reducers: {
        addImage(state, action: PayloadAction<Image>) {
            const newState = [...state];
            newState.push(action.payload)
            return newState;
        },

        removeImage(state, action: PayloadAction<string>) {
            const newState = [...state];
            return newState.filter((image) => image.imageId !== action.payload);
        }
    }
})

export default imagesSlice;