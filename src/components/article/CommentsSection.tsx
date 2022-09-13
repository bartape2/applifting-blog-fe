import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../store/hooks';
import { Article, Comment, getEmptyCommentObject } from '../../store/models';
import { createComment } from '../../store/articleList/articleListActions';
import CommentElem from './CommentElem';

const CommentsSection = (props: {article: Article}) => {
    const dispatch = useAppDispatch();
    const [comments, setComments] = useState([] as Comment[]);
    const [newComment, setNewComment] = useState(getEmptyCommentObject(props.article.articleId));
    const [authorError, setAuthorError] = useState('');
    const [contentError, setContentError] = useState('');


    useEffect(() => {
        setComments(props.article.comments)
    }, [props.article]);

    const checkComments = (): boolean => {
        return true;
    }

    const validateAuthor = (): boolean => {
        if (newComment.author === '') {
            setAuthorError('Name cannot be empty');
            return false;
        }
        setAuthorError('');
        return true;
    }

    const validateContent = (): boolean => {
        if (newComment.content === '') {
            setContentError('Comment content cannot be empty');
            return false;
        }
        setContentError('');
        return true;
    }

    const saveComment = (): void => {
        if (validateAuthor() && validateContent()) {
            dispatch(createComment(newComment));
            toast.success('Comment was created');
            setNewComment(getEmptyCommentObject(props.article.articleId));
        } else {
            toast.error('The comment was not created. Please fix the errors.');
        }
    }

    return(
        <>
            <div className='commentHeader'>Comments ({comments.length})</div>
            <div className='newComment'>
                <form onSubmit={saveComment}>
                    <div>
                        <TextField
                            margin='dense'
                            label='Your Name'
                            type='text'
                            required
                            value={newComment.author}
                            onChange={(e: any) => setNewComment({...newComment, author: e.target.value})}
                            fullWidth
                            error={authorError !== ''}
                            helperText={authorError}
                        />
                    </div>
                    <div>
                        <TextField
                            margin='dense'
                            label='Content'
                            type='text'
                            required
                            value={newComment.content}
                            onChange={(e: any) => setNewComment({...newComment, content: e.target.value})}
                            fullWidth
                            multiline
                            minRows={3}
                            error={contentError !== ''}
                            helperText={contentError}
                        />
                    </div>
                    <div>
                        <Button variant='contained' onClick={saveComment}>Comment</Button>
                    </div>
                </form>
            </div>
            <div className='commentsList'>
            {
                checkComments() ? (
                    comments.map((comment: Comment) => (
                        <CommentElem key={comment.commentId} comment={comment} />
                    ))
                    ) : (
                        <div>Loading...</div>
                    )
            }
            </div>
        </>
    );
}

export default CommentsSection;