import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Article } from '../../store/models';
import { deleteArticle } from '../../store/articleList/articleListActions';
import { useState } from 'react';
import DeleteConfirm from './DeleteConfirm';
import { RootState } from '../../store/store';

const MyArticles = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state: RootState) => state.articles);

    const defaultDeleteConfirmOptions = {
        open: false,
        articleId: '',
        articleTitle: ''
    };
    const [deleteConfirmOptions, setDeleteConfirmOptions] = useState(defaultDeleteConfirmOptions);
    const navigate = useNavigate();

    const openDeleteConfirm = (articleId: string, articleTitle: string): void => {
        setDeleteConfirmOptions({open: true, articleId, articleTitle});
    }

    const onDeleteConfirmResult = (perform: boolean, articleId?: string): void => {
        if (perform && articleId) {
            dispatch(deleteArticle(articleId));
        }
        setDeleteConfirmOptions(defaultDeleteConfirmOptions);
    }

    return <>
        <h1 className='adminH1'>My Articles</h1>
        <Button className='adminHeaderBtn' variant='contained' onClick={() => navigate('/admin/new-article')}>Create New</Button>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell className='articlesTableTH' component='th'>Article title</TableCell>
                        <TableCell className='articlesTableTH' component='th'>Perex</TableCell>
                        <TableCell className='articlesTableTH' component='th' align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        articles.map((article: Article) => (
                            <TableRow key={article.articleId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope='row'>{article.title}</TableCell>
                                <TableCell align='left'>{article.perex}</TableCell>
                                <TableCell align='center'>
                                    <div className='tableRowActions'>
                                        <IconButton size='small' onClick={() => navigate(`/admin/edit-article/${article.articleId}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size='small' onClick={() => openDeleteConfirm(article.articleId, article.title)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <DeleteConfirm {...deleteConfirmOptions} onConfirmResult={onDeleteConfirmResult} />
    </>;
}

export default MyArticles;