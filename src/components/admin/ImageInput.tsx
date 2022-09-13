import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import BlogImage from '../BlogImage';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createImage, deleteImage } from '../../store/images/imagesActions';

const ImageInput = (props: {imageId: string | null, newImgCallback: ((imgId: string | null) => void)}) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [imgId, setImgId] = useState(props.imageId);

    useEffect(() => {
        setImgId(props.imageId);
    }, [props.imageId]);
    
    const newImgSelected = async (event: any) => {
        setLoading(true);

        dispatch(createImage(event.target.files[0], (newImgId) => {
            // New image sucessfully uploaded -> remove the previous one
            if (imgId !== null) {
                dispatch(deleteImage(imgId, false));
            }
            setImgId(newImgId);
            props.newImgCallback(newImgId);
            toast.success('The image was successfully uploaded');
            setLoading(false);
        }));
    }

    const deleteImg = async () => {
        setLoading(true);
        if (imgId !== null) {
            dispatch(deleteImage(imgId));
        }
        setImgId(null);
        await props.newImgCallback(null);
        setLoading(false);
    }

    const loadingContent = (
        <LoadingButton loading variant='text'>&nbsp;</LoadingButton>
    );

    const noImgContent = (
        <Button variant='text' component='label' size='small'>
            Upload
            <input hidden accept='image/*' multiple type='file' onChange={newImgSelected} />
        </Button>
    );

    const imgPresentContent = (
        <div className='adminImgContainer'>
            <div>
                <BlogImage className='imgPreview' imgId={imgId} placeholder={true} />
            </div>
            <div className='adminImgActions'>
                <Button variant='text' component='label' size='small'>
                    Upload new
                    <input
                        hidden
                        accept='image/*'
                        multiple
                        type='file'
                        onChange={newImgSelected}
                    />
                </Button>
                <Button variant='text' color='error' component='label' size='small' onClick={deleteImg}>
                    Delete
                </Button>
            </div>
        </div>
    );

    return(
        <div className='customInputField'>
            <label className={imgId === null ? '' : 'shrinkedLabel'}>Featured Image</label>
            {
                isLoading ? loadingContent : (
                    (imgId === null) ? noImgContent : imgPresentContent
                )
            }
        </div>
    );
}

export default ImageInput;
