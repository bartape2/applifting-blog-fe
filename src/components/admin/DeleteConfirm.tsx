import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';

const DeleteConfirm = (props: {articleId: string, articleTitle: string, open: boolean, onConfirmResult: (perform: boolean, articleId?: string) => void}) => {
    const [articleId, setArticleId] = useState(props.articleId);
    const [articleTitle, setArticleTitle] = useState(props.articleId);
    const [open, setOpen] = useState(props.open);
    
    useEffect(() => {
        setArticleId(props.articleId);
        setArticleTitle(props.articleTitle);
        setOpen(props.open);
    }, [props.articleId, props.articleTitle, props.open]);

    return(
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth='xs'
            open={open}
        >
            <DialogTitle>Delete Article</DialogTitle>
            <DialogContent>
                {`Are you sure you want to delete article ${articleTitle}?`}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.onConfirmResult(false)}>
                    Cancel
                </Button>
                <Button onClick={() => props.onConfirmResult(true, articleId)}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirm;