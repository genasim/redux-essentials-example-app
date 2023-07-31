import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = []

//  Async thunks act as services to connect to APIs
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const [latestNotification] = selectAllNotifications(getState());
        const latestTimestamp = latestNotification ?
            latestNotification.date : ''

        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.data
    })

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        readAllNotifications(state, action) {
            state.forEach(notification => {
                notification.read = true
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.push(...action.payload)
            state.forEach(notification => {
                // Any notifications we've read are no longer new
                notification.isNew = !notification.read
            })
            // Sort with newest first
            state.sort((a, b) => b.date.localeCompare(a.date))
        })
    }
})

export const { readAllNotifications } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications