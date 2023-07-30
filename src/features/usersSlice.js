import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = []

//  Async thunks act as services to connect to APIs
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (_, action) =>
            action.payload
        )
    }
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => 
    state.users.find(user => user.id === userId)