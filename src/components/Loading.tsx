import { CircularProgress } from '@mui/material';

const Loading = (props: {className?: string}) => {
    return (
        <div className={props.className}>
            <div className='loadingContainer'>
                <CircularProgress />
            </div>
        </div>
    );
}

export default Loading;