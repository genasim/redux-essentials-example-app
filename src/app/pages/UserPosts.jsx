import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllPosts } from '../../features/postsSlice';
import { selectUserById } from '../../features/usersSlice';

function UserPosts({ match }) {
    const { userId } = match.params
    const user = useSelector(state => selectUserById(state, userId))

    const userPosts = useSelector(state => {
        const allPosts = selectAllPosts(state)
        return allPosts.filter(post => post.user === userId)
    })

    const postTitles = userPosts.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>
                {postTitles}
            </ul>
        </section>
    );
}

export default UserPosts;