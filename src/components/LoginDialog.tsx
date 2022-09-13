import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { login, logout } from '../store/user/userActions';

function LoginDialog() {
    const [isOpen, setOpen] = React.useState(false);
    const [credentials, setCredentials] = React.useState({username: '', password: ''});
    const isLoggedIn = useAppSelector((state: RootState) => state.user !== undefined && state.user.accessToken !== '');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const changeCredentials = (username: string, password: string) => {
        setCredentials({username, password});
    };

    const handleLogIn = async (e: any) => {
        e.preventDefault();
        dispatch(login(credentials.username, credentials.password, () => {
            navigate('/admin/my-articles');
            handleClose();
        }));
    };

    const handleLogout = async () => {
        dispatch(logout());
    };

    return (
        <>
            {
                isLoggedIn ?
                    <span className={'headerNavLink'} onClick={handleLogout}>Log out</span>
                    :
                    <span className={'headerNavLink'} onClick={handleClickOpen}>Log in</span>
                    
            }
        
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Log In</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleLogIn} id='loginForm'>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='username'
                            label='Username'
                            type='text'
                            required={true}
                            fullWidth
                            variant='standard'
                            value={credentials.username}
                            onChange={(e) => changeCredentials(e.target.value, credentials.password)}
                        />
                        <TextField
                            margin='dense'
                            id='passwd'
                            label='Password'
                            type='password'
                            required={true}
                            fullWidth
                            variant='standard'
                            value={credentials.password}
                            onChange={(e) => changeCredentials(credentials.username, e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} type={'submit'} form={'loginForm'}>Log in</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
      </>
    );
}

export default LoginDialog;