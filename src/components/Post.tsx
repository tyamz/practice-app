import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '../app/services/posts';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetUserQuery } from '../app/services/users';

const Post = () => {
    const params = useParams();
    const {
        data: post,
        isLoading,
        error,
    } = useGetPostByIdQuery(params.postId ?? skipToken);

    const { data: user } = useGetUserQuery(post?.userId ?? skipToken);

    return (
        <div>
            {isLoading && <h3>Loading Post...</h3>}
            {post && user && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <small>
                        Posted by {user.firstName} {user.lastName}
                    </small>
                </>
            )}
            {error && <h2>Error Occurred</h2>}
        </div>
    );
};

export default Post;
