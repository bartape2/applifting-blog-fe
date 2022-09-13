export interface User {
    username: string;
    accessToken: string;
}
export const getEmptyUserObject = (): User => {
    return {
        username: '',
        accessToken: ''
    }
}

export interface Article {
    articleId: string;
    title: string;
    perex: string;
    content: string;
    imageId: string | null;
    createdAt: string;
    lastUpdatedAt: string;
    comments: Comment[];
    isLoaded: boolean;
}
export const getEmptyArticleObject = (): Article => {
    return {
        articleId: '',
        title: '',
        perex: '',
        content: '',
        imageId: null,
        createdAt: '',
        lastUpdatedAt: '',
        comments: [],
        isLoaded: false
    }
}

export interface Comment {
    articleId: string;
    commentId: string;
    author: string;
    content: string;
    createdAt: string;
    score: number;
}
export const getEmptyCommentObject = (articleId?: string): Comment => {
    return {
        articleId: articleId ? articleId : '',
        commentId: '',
        author: '',
        content: '',
        createdAt: '',
        score: 0
    }
}

export interface Image {
    imageId: string;
    // Img data in base64
    data: string;
}

export const getImageObject = (imageId: string, base64Img: string): Image => {
    return {
        imageId: imageId ? imageId : '',
        data: base64Img
    }
}
