import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectAllUsers } from '../../features/usersSlice'
import { readAllNotifications, selectAllNotifications } from '../../features/notificationsSlice'
import classNames from 'classnames'

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)
  
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(readAllNotifications())
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const notificationClassnames = classNames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClassnames}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}