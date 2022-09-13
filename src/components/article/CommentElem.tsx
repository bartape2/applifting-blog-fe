import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Comment } from '../../store/models';
import FormatUtils from '../../utils/FormatUtils';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { commentVote } from '../../store/articleList/articleListActions';
import { useAppDispatch } from '../../store/hooks';

const CommentElem = (props: {comment: Comment}) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState(props.comment);

    useEffect(() => {
        setComment(props.comment);
    }, [props.comment]);
    
    const upvote = () => {
        dispatch(commentVote(comment, true));
    }

    const downvote = () => {
        dispatch(commentVote(comment, false));
    }

    return(
        <div className='articleComment'>
            <div>
                <span className='commentAuthor'>{comment.author}</span>
                <span className='commentTime'>{FormatUtils.formatCommentDate(comment.createdAt)}</span>
            </div>
            <div className='commentContent'>{comment.content}</div>
            <div className='commentVotes'>
                <div className='votesCount'>{FormatUtils.formatCommentScore(comment.score)}</div>
                <div>
                    <IconButton size='small' onClick={upvote}>
                        <KeyboardArrowUpIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton size='small' onClick={downvote}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default CommentElem;