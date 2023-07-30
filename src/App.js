import React from 'react'
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostsList from './components/PostsList'
import AddPostForm from './components/AddPostForm'
import SinglePostPage from './app/pages/SinglePost'
import EditPostForm from './app/pages/EditPost'
import UsersList from './app/pages/UsersPage'
import UserPosts from './app/pages/UserPosts'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage}/>
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList}/>
          <Route exact path="/users/:userId" component={UserPosts}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
