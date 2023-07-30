import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../features/posts/postsSlice';

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const dispatch = useDispatch()
    const onSaveButtonClicked = async () => {
        if (!canSave) return
        try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({ title, content, user: userId })).unwrap()
            setTitle('')
            setContent('')
        } catch (error) {
            console.log(`Failed to save the post `, error);
        } finally {
            setAddRequestStatus('idle')
        }
    }

    const users = useSelector(state => state.users)
    const userOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <select value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    placeholder="What's on your mind"
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSaveButtonClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm;