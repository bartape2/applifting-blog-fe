import { Article, Comment } from '../models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialArticlesState: Article[] = [];

const articleComparator = (a: Article, b: Article) => a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1;
const commentComparator = (a: Comment, b: Comment) => a.createdAt > b.createdAt ? -1 : 1;

const articleListSlice = createSlice({
    name: 'articles',
    initialState: initialArticlesState,
    reducers: {
        setArticles(state, action: PayloadAction<Article[]>) {
            action.payload.sort(articleComparator);
            return action.payload;
        },

        addArticle(state, action: PayloadAction<Article>) {
            const newState = state.concat(action.payload);
            newState.sort(articleComparator);
            return newState;
        },

        editArticle(state, action: PayloadAction<Article>) {
            const newState = [...state];
            return newState.map((article) => article.articleId !== action.payload.articleId ? article : action.payload);
        },

        removeArticle(state, action: PayloadAction<string>) {
            const newState = [...state];
            return newState.filter((article) => article.articleId !== action.payload);
        },

        setArticleDetail(state, action: PayloadAction<Article>) {
            let newState = [...state];
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].articleId === action.payload.articleId) {
                    newState[i] = action.payload;
                    newState[i].comments.sort(commentComparator);
                    return newState;
                }
            }
            newState = state.concat(action.payload);
            newState.sort(articleComparator);
            return newState;
        },

        addComment(state, action: PayloadAction<Comment>) {
            const newState = [...state];
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].articleId === action.payload.articleId) {
                    newState[i] = {...newState[i]};
                    newState[i].comments = [...newState[i].comments];
                    newState[i].comments.unshift(action.payload);
                    return newState;
                }
            }
            return newState;
        },

        commentChange(state, action: PayloadAction<Comment>) {
            const newState = [...state];
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].articleId === action.payload.articleId) {
                    newState[i] = {...newState[i]};
                    newState[i].comments = [...newState[i].comments];
                    for (let j = 0; j < newState[i].comments.length; j++) {
                        if (newState[i].comments[j].commentId === action.payload.commentId) {
                            newState[i].comments[j] = {...newState[i].comments[j]};
                            newState[i].comments[j].score = action.payload.score;
                            return newState;
                        }
                    }
                }
            }
            return newState;
        },
    }
})

export default articleListSlice;