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
          <Route exact path={'/posts/:postId'} component={SinglePostPage}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
