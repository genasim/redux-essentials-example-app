const { createSlice } = require("@reduxjs/toolkit");


const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
      pushPost: (state, action) => {
        state.push(action.payload)
      }
    }
})

export const { pushPost } = postsSlice.actions

export default postsSlice.reducer