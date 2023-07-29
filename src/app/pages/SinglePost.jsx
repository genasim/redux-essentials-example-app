import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PostAuthor from '../../components/PostAuthor';
import ReactionButtons from '../../components/ReactionButton';
import TimeAgo from '../../components/TimeAgo';
import { selectPostById } from '../../features/posts/postsSlice';

function SinglePostPage({ match }) {
    const { postId } = match.params
    const post = useSelector(state => selectPostById(state, postId))

    if (!post)
        return (
            <section>
                <h2>Could not find post with id {postId}</h2>
            </section>
        )

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <p className="post-content">{post.content}</p>
                <TimeAgo />
                <ReactionButtons post={post} />
                <div>
                    <Link to={`/editPost/${post.id}`} className={'button'}>
                        Edit post
                    </Link>
                </div>
            </article>
        </section>
    );
}

export default SinglePostPage;