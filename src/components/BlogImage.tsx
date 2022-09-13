import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Image } from '../store/models';
import { fetchImage } from '../store/images/imagesActions';
import { RootState } from '../store/store';
import Loading from './Loading';

const BlogImage = (props: {imgId: string | null, alt?: string, className?: string, placeholder?: boolean}) => {
    const image: Image | undefined = useAppSelector(
        (state: RootState) => state.images.find((i) => props.imgId === i.imageId)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.imgId !== null) {
            dispatch(fetchImage(props.imgId));
        } else {
        }
    }, [dispatch, props.imgId]);

    if (image === undefined && props.imgId) {
        return <Loading className={props.className}/>
    } else {
        return image !== undefined || props.placeholder ? (
            <img className={props.className} src={image && image.data !== '' ? image.data : '/missingImg.png'} alt={props.alt}/>
        ) : <></>;
    }
}

export default BlogImage;