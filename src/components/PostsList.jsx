import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButton';
import { fetchPosts, selectAllPosts } from '../features/posts/postsSlice';

function PostsList() {
  const posts = useSelector(selectAllPosts)

  const dispatch = useDispatch()
  const postStatus = useSelector(state => state.posts.status)
  
  //  Fetch posts on mount and update
  useEffect(() => {
    if (postStatus === 'idle')
      dispatch(fetchPosts())
  }, [postStatus, dispatch])  //  <- Deps for using the effect


  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <ReactionButtons post={post} />
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