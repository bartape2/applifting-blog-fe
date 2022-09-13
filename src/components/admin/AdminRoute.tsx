import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

const AdminRoute = () => {
    const user = useAppSelector((state: RootState) => state.user);
    if (!user.accessToken) {
        return <Navigate to='/' replace />;
    }
  
    return  <Outlet />;
}
export default AdminRoute;