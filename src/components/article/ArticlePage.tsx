import { Divider } from '@mui/material';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Article } from '../../store/models';
import { fetchArticle } from '../../store/articleList/articleListActions';
import { RootState } from '../../store/store';
import FormatUtils from '../../utils/FormatUtils';
import BlogImage from '../BlogImage';
import Loading from '../Loading';
import CommentsSection from './CommentsSection';

const ArticlePage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const article: Article | undefined = useAppSelector(
        (state: RootState) => state.articles.find((a) => params.articleId === a.articleId)
    );

    useEffect(() => {
        if (params.articleId !== undefined) {
            dispatch(fetchArticle(params.articleId));
        }
    }, [dispatch, params.articleId]);

    const isArticleLoaded = (): boolean => {
        if (article === undefined || article.articleId === '') {
            return false;
        }
        return true;
    }

    return <>
            {
                article !== undefined && isArticleLoaded() ? (
                    <div className='wholeArticle'>
                        <h1>{article.title}</h1>
                        <div className='articleTimestamp'>{FormatUtils.formatDate(article.lastUpdatedAt)}</div>
                        <div>
                            <BlogImage className='articleImage' imgId={article.imageId} alt={article.title} />
                        </div>
                        <div className='articleContent'>
                            <MarkdownEditor.Markdown source={article.content} />
                        </div>
                        <Divider variant='middle' />
                        {
                            article.comments !== undefined ?
                                <CommentsSection article={article} /> : <Loading />
                        }
                    </div>
                ) : (
                    <Loading />
                )
            }
    </>;
}

export default ArticlePage;