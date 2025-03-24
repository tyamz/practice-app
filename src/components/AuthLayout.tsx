import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppSelector } from '../app/hooks';

const AuthLayout = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector((state) => state.user);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    return <Outlet />;
};

export default AuthLayout;
