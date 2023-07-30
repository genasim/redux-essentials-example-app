import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client';


const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

//  Async thunks act as services to connect to APIs
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
  // We send the initial data to the fake API server
  const response = await client.post('/fakeApi/posts', initialPost)
  // The response includes the complete post object, including unique ID
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    // pushPost: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    //       }
    //     }
    //   }
    // },

    // The existing `postAdded` reducer and prepare callback were deleted
    reactionAdded(state, action) { }, // omit logic
    postUpdated(state, action) { }, // omit logic
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, _) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
})

export const { pushPost, updatePost, addReaction } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)