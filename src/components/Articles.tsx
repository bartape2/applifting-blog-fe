import { LinearProgress } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { Article } from '../store/models';
import { RootState } from '../store/store';
import ArticleDetail from './ArticleDetail';

const Articles = () => {
    const articles = useAppSelector((state: RootState) => state.articles);

    const artticlesLoaded = (): boolean => {
        return articles.length >= 0;
    }
    
    return(
        <>
            <h1>Recent articles</h1>
            <div>
                {
                    artticlesLoaded() ? (
                        articles.map((article: Article) => (
                            <ArticleDetail key={article.articleId} article={article} />
                        ))
                        ) : (
                            <LinearProgress />
                        )
                }
            </div>
        </>

    );
}
export default Articles;