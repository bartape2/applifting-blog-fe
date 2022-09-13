import { Link } from 'react-router-dom';
import { Article } from '../store/models';
import FormatUtils from '../utils/FormatUtils';
import BlogImage from './BlogImage';

const ArticleDetail = (props: {article: Article}) => {
    const article = props.article;

    return (
        <div className={'articleDetail'}>
            <div className={'imgContainer'}>
                <BlogImage
                    className='articleListImg'
                    alt={article.title}
                    imgId={article.imageId}
                    placeholder={true}
                />
            </div>
            <div>
                <div className={'articleDetailTitle'}>{article.title}</div>
                <div className={'articleDetailDate'}>{FormatUtils.formatDate(article.lastUpdatedAt)}</div>
                <div className={'articleDetailPerex'}>{article.perex}</div>
                <div><Link className='articleDetailLink' to={`article/${article.articleId}`}>Read whole article</Link></div>
            </div>
        </div>
    );
}

export default ArticleDetail;