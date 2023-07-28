import { sub } from "date-fns";

const { createSlice, nanoid } = require("@reduxjs/toolkit");


const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: 0,
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: 1,
    date: sub(new Date(), { minutes: 5 }).toISOString()
  }
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
            date: new Date().toISOString(),
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