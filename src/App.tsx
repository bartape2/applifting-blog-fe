import { NavLink, Outlet } from 'react-router-dom';
import './style.scss'
import LoginDialog from './components/LoginDialog';
import { useAppSelector } from './store/hooks';
import { Toaster } from 'react-hot-toast';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticles } from './store/articleList/articleListActions';

const App = () => {
    
    const dispatch = useDispatch();
    const user = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const headerClassName = (navData: {isActive: boolean}) => (`headerNavLink ${navData.isActive ? 'activeHeaderLink' : ''}`);
    return (
        <>
            <Toaster />
            <nav className={'headerNav'}>
                <NavLink className={headerClassName} to='/'>Recent articles</NavLink>
                <NavLink className={headerClassName} to='/about'>About</NavLink>
                <div className={'rightNav'}>
                    {
                        user.accessToken !== '' ?
                            <>
                                <NavLink className={headerClassName} to='/admin/my-articles'>My Articles</NavLink>
                                <NavLink className={headerClassName} to='/admin/new-article'>Create Article</NavLink>
                            </>
                            :
                            <></>
                            
                    }
                    <LoginDialog />
                </div>
            </nav>
            <div className={'content'}>
                <Outlet />
            </div>
        </>
    );
}

export default App;
