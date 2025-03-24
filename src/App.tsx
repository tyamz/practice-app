import './App.css';
import { useGetPostsQuery } from './app/services/posts';
import { Post } from './models/Post';
import { useAppDispatch } from './app/hooks';
import { logout } from './features/users/userSlice';

function App() {
    const dispatch = useAppDispatch();

    const {
        data = { posts: [] },
        error,
        isLoading,
    } = useGetPostsQuery('posts');
    
    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            <button type='button' onClick={() => dispatch(logout())}>
                Logout
            </button>
            <h1>Posts</h1>
            <hr />
            <ul>
                {data.posts.map((post: Post) => (
                    <a key={post.id} href={'/posts/' + post.id}>
                        <li>{post.title}</li>
                    </a>
                ))}
            </ul>
        </>
    );
}

export default App;
