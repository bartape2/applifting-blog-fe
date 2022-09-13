import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import imagesSlice from './imagesSlice';
import { getImageObject } from '../models';
import toast from 'react-hot-toast';
import Api from '../../service/Api';

export const imagesActions = imagesSlice.actions;

const convertImgToBase64 = (data: Blob, resultCallback: (base64Img: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(data); 
    reader.onloadend = () => {
        const base64Img = reader.result;
        resultCallback(base64Img as string);             
    }
}

export const deleteImage = (imageId: string, verbose: boolean = true): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        try {
            const response = await Api().delete(`images/${imageId}`);
            if (response.status === 204) {
                dispatch(imagesActions.removeImage(imageId));
                if (verbose) {
                    toast.success('Image deleted sucessfully');
                }
            } else {
                console.log(`Error while deleting image: ${response.status}`);
                if (verbose) {
                    toast.error('Error while deleting the image');
                }
            }
        } catch (err: any) {
            if (err.response && err.response.data) {
                console.log(err.response.data);
                if (verbose) {
                    toast.error(err.response.data.message || err.response.data.title || 'Unknown error while deleting image');
                }
            } else {
                if (verbose) {
                    toast.error('Unknown error while deleting image');
                }
            }
        }
    }
}

export const createImage = (img: File, onCreateCallback: (imageId: string) => void): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const formData = new FormData();
        formData.append('image', img);

        try {
            const response = await Api().post('images', formData);
            if (response.status === 200) {
                const createdImgId = response.data[0].imageId;
                convertImgToBase64(img, (base64Img) => {
                    dispatch(imagesActions.addImage(getImageObject(createdImgId, base64Img)));
                    onCreateCallback(createdImgId);
                })
            } else {
                const errMsg = `Error while uploading the image: ${response.status}`;
                console.log(errMsg);
                toast.error(errMsg);
            }
        } catch (err: any) {
            const errMsg = err.response.data.message || err.response.data.title || 'Unknown error while uploading the image';
            console.log(errMsg);
            toast.error(errMsg);
        }
    }
}

export const fetchImage = (imageId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    
    return async(dispatch, getState) => {
        const images = getState().images;
        for (const image of images) {
            if (image.imageId === imageId) {
                // Image is already loaded
                return;
            }
        }

        try {
            const response = await Api().get(`images/${imageId}`, { responseType: 'blob' });
            if (response.status === 200) {
                // Convert image to Base64 and save it in the store
                const reader = new FileReader();
                reader.readAsDataURL(response.data); 
                reader.onloadend = () => {
                    const base64Img = reader.result;                
                    dispatch(imagesActions.addImage(getImageObject(imageId, base64Img as string)));
                }
            } else if (response.status === 404){
                console.log(`Image ${imageId} does not exist`);
                dispatch(imagesActions.addImage(getImageObject(imageId, '')));
            } else {
                console.log(`Error while loading image ${imageId}: ${response.status}`);
            }
        } catch (err: any) {
            console.log(`Error while loading image ${imageId}: ${err.response.data.message || err.response.data.title}`);
        }
    }
}