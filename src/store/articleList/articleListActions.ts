import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import articleListSlice from './articleListSlice';
import { Article, Comment } from '../models';
import toast from 'react-hot-toast';
import Api from '../../service/Api';

export const articleListActions = articleListSlice.actions

export const fetchArticles = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    
    return async(dispatch, getState) => {
        if (getState().articles.length === 0) {
            try {
                const response = await Api().get('articles');
                if (response.status !== 200) {
                    toast.error(`Error while loading articles`);
                    return;
                }

                const articles = response.data.items;
                for (const article of articles) {
                    article.isLoaded = false;
                }
                dispatch(articleListActions.setArticles(articles));
            } catch(err: any) {
                toast.error(`Error while loading articles`);
            }
        }
    }
}

export const deleteArticle = (articleId: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const response = await Api().delete(`articles/${articleId}`);
        toast.success('Article deleted sucessfully');
        dispatch(articleListActions.removeArticle(articleId));
    }
}

export const createArticle = (article: Article): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const response = await Api().post('articles', article);
        if (response.status === 200) {
            dispatch(articleListActions.addArticle(response.data));
            toast.success(`Article ${response.data.title} created`);
        } else {
            toast.error(`Error while creating the article`);
        }
    }
}

export const editArticle = (article: Article): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const response = await Api().patch(`articles/${article.articleId}`, article);
        if (response.status === 200) {
            dispatch(articleListActions.editArticle(response.data));
            toast.success(`Article ${response.data.title} edited`);
        } else {
            toast.error(`Error while editing the article`);
        }
    }
}

export const changeArticleImg = (articleId: string, newImgId: string | null): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const article = getState().articles.find((a: Article) => a.articleId === articleId);
        if (article) {
            const articleWithNewImg = {...article};
            articleWithNewImg.imageId = newImgId;
            try {
                const response = await Api().patch(`articles/${article.articleId}`, articleWithNewImg);
                if (response.status === 200) {
                    dispatch(articleListActions.editArticle(response.data));
                    toast.success(`Image of article ${response.data.title} changed`);
                } else {
                    toast.error('Error while changing the article image');
                }
            } catch(err: any) {
                toast.error('Error while changing the article image');
            }
        }
    }
}

export const fetchArticle = (articleId: string, onFetchCallback?: (article: Article) => void): ThunkAction<void, RootState, unknown, AnyAction> => {
    
    return async(dispatch, getState) => {
        const articles = getState().articles;
        for (const article of articles) {
            if (article.articleId === articleId) {
                if (article.isLoaded) {
                    // Article is already loaded
                    if (onFetchCallback) {
                        onFetchCallback(article);
                    }
                    return;
                } else {
                    break;
                }
            }
        }

        const response = await Api().get(`articles/${articleId}`);
        if (response.status === 200) {
            response.data.isLoaded = true;
            for (const comment of response.data.comments) {
                comment.articleId = articleId;
            }
            dispatch(articleListActions.setArticleDetail(response.data));
            if (onFetchCallback) {
                onFetchCallback(response.data);
            }
        } else if (response.status === 404) {
            toast.error(`Article does not exist`);
        } else {
            toast.error(`Error while loading the article`);
        }
    }
}

export const createComment = (comment: Comment): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const response = await Api().post('comments', comment);
        if (response.status === 200) {
            dispatch(articleListActions.addComment({...response.data, articleId: comment.articleId}));
        } else {
            console.log(`Error while creating the comment`);
        }
    }
}

export const commentVote = (comment: Comment, isUpvote: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async(dispatch, getState) => {
        const errMsg = 'Error while voting for the comment';
        try {
            const response = await Api().post(`comments/${comment.commentId}/vote/${isUpvote ? 'up' : 'down'}`);
            if (response.status === 200) {
                dispatch(articleListActions.commentChange({...response.data, articleId: comment.articleId}));
            } else {
                toast.error(errMsg);
                console.log(`${errMsg}: ${response.status}`);
            }
        } catch(err: any) {
            console.log(errMsg, err);
        }
    }
}