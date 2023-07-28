const { createSlice, nanoid } = require("@reduxjs/toolkit");


const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    pushPost: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          }
        }
      }
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload
      const post = state.find(element => element.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
    }
  }
})

export const { pushPost, updatePost } = postsSlice.actions

export default postsSlice.reducer