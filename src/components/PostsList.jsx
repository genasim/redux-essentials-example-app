import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

function PostsList() {
  const posts = useSelector(state => state.posts)

  const renderedPosts = posts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <PostAuthor userId={post.user} />
          <Link to={`/posts/${post.id}`} className={'button muted-button'}>
            View post
          </Link>
        </div>
      </article>
    )
  })

  return (
    <div>
      <section className='posts-list'>
        <h2>Posts</h2>
        {renderedPosts}
      </section>
    </div>
  );
}

export default PostsList;