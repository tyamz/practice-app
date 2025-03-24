import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router';
import Post from './components/Post.tsx';
import Login from './components/Login.tsx';
import AuthLayout from './components/AuthLayout.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path='/' element={<App />} />
                        <Route path='/posts/:postId' element={<Post />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
