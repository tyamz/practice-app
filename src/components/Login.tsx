import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authenticateUser } from '../features/users/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading, error } = useAppSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = () => {
        dispatch(authenticateUser({ username: user, password: pass }));
    };

    return (
        <div>
            {error && <p className='text-red'>Error: {error}</p>}
            {loading && <p>Logging in...</p>}
            <div>
                <label htmlFor='user'>User</label>{' '}
                <input
                    id='user'
                    type='text'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='pass'>Password</label>{' '}
                <input
                    id='pass'
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <button type='button' onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
