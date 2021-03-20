import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import PostContainer from './components/Posts/PostsContainer'
import SinglePost from './components/SinglePost/SinglePostContainer'
import Page404 from './404/404'
import CreatePost from './components/CreatePost/CreatePost'

function App() {
  return (
    <Provider store={store}>
      <div className="wrapper-f">
        <div className="grid-box">
          <Header />
          <NavBar />
          <Switch>
            <Route exact path="/" component={PostContainer} />
            <Route exact path="/create" component={CreatePost} />
            <Route exact path="/posts/:id" component={SinglePost} />
            <Route component={Page404} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Provider>
  )
}

export default App
