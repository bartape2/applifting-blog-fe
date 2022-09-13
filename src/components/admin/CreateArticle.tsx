import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Article, getEmptyArticleObject } from '../../store/models';
import { changeArticleImg, createArticle, editArticle, fetchArticle } from '../../store/articleList/articleListActions';
import { RootState } from '../../store/store';
import ContentInput from './ContentInput';
import ImageInput from './ImageInput';

const CreateArticle = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const articleFromStore: Article | undefined = useAppSelector(
        (state: RootState) => state.articles.find((a: Article) => params.articleId === a.articleId)
    );
    const isEdit = params.articleId ? true : false;
    const [isLoaded, setLoaded] = useState(false);
    const [article, setArticle] = useState(articleFromStore ? articleFromStore : getEmptyArticleObject());
    // Form validation
    const [titleError, setTitleError] = useState('');
    const [perexError, setPerexError] = useState('');
    const [contentError, setContentError] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        if (params.articleId !== undefined) {
            dispatch(fetchArticle(params.articleId));
        } else {
            setArticle(getEmptyArticleObject());
        }
    }, [dispatch, params.articleId]);

    useEffect(() => {
        if (articleFromStore) {
            if (isLoaded) {
                setArticle({...article, imageId: articleFromStore.imageId});
            } else {
                setArticle(articleFromStore);
                setLoaded(true);
            }
        }
    }, [article, articleFromStore, isLoaded]);

    const validate = (): boolean => {
        return validateTitle() && validatePerex() && validateContent();
    }

    const validateTitle = (): boolean => {
        if (article.title === '') {
            setTitleError('Title cannot be empty');
            return false;
        }
        setTitleError('');
        return true;
    }

    const validatePerex = (): boolean => {
        if (article.perex === '') {
            setPerexError('Perex cannot be empty');
            return false;
        }
        setPerexError('');
        return true;
    }

    const validateContent = (): boolean => {
        if (article.content === '') {
            setContentError('Content cannot be empty');
            return false;
        }
        setContentError('');
        return true;
    }

    const saveArticle = (): void => {
        if (validate()) {
            if (isEdit) {
                dispatch(editArticle(article));
            } else {
                dispatch(createArticle(article));
            }
            navigate('/admin/my-articles');
        } else {
            toast.error('The article was not saved. Please fix the errors.');
        }
    }

    const newImgCallback = async (newImgId: string | null) => {
        const newArticleState = {...article};
        newArticleState.imageId = newImgId;
        setArticle(newArticleState);

        // If editing an existing article, change the imageId in the DB immediately
        if (isEdit) {
            dispatch(changeArticleImg(article.articleId, newImgId));
        }
    }

    const title = isEdit ? 'Edit article' : 'Create new article';
    return( 
        <>
            <h1 className='adminH1'>{title}</h1>
            <>
                <Button className='adminHeaderBtn' variant='contained' onClick={saveArticle}>Publish Article</Button>
                <div>
                    <form onSubmit={saveArticle}>
                        <div>
                            <TextField
                                autoFocus
                                margin='normal'
                                label='Title'
                                type='text'
                                required
                                value={article.title}
                                onChange={(e) => setArticle({...article, title: e.target.value})}
                                fullWidth
                                error={titleError !== ''}
                                helperText={titleError}
                                onBlur={validateTitle}
                            />
                        </div>
                        <div>
                            <ImageInput imageId={article.imageId} newImgCallback={newImgCallback} />
                        </div>
                        <div>
                            <TextField
                                margin='normal'
                                label='Perex'
                                multiline
                                minRows={3}
                                required
                                value={article.perex}
                                onChange={(e) => setArticle({...article, perex: e.target.value})}
                                fullWidth
                                error={perexError !== ''}
                                helperText={perexError}
                                onBlur={validatePerex}
                            />
                        </div>
                        <div>
                            <ContentInput 
                                value={article.content}
                                onChange={(e) => setArticle({...article, content: e})}
                                onBlur={validateContent}
                                error={contentError !== ''}
                                helperText={contentError}
                            />
                        </div>
                    </form>
                </div>
            </>
        </>
    );
}

export default CreateArticle;