import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButton';
import Spinner from './Spinner'
import { fetchPosts, selectAllPosts } from '../features/postsSlice';

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

function PostsList() {
  const posts = useSelector(selectAllPosts)

  const dispatch = useDispatch()
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  //  Fetch posts on mount and update
  useEffect(() => {
    if (postStatus === 'idle')
      dispatch(fetchPosts())
  }, [postStatus, dispatch])  //  <- Deps for using the effect


  let content = undefined

  // eslint-disable-next-line
  switch (postStatus) {
    case 'loading':
      content = <Spinner text='Loading...' />
      break;

    case 'succeeded':
      content = posts.slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(post => <PostExcerpt post={post} key={post.id} />)
      break;

    case 'failed':
      content = (
        <div>
          {error}
        </div>
      )
      break;
  }

  return (
    <div>
      <section className='posts-list'>
        <h2>Posts</h2>
        {content}
      </section>
    </div>
  );
}

export default PostsList;