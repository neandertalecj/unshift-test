import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../redux/store'
import { getPosts } from '../../redux/postsReducer'
import { PostsStateType } from '../../redux/postsReducer'
import { NavLink } from 'react-router-dom'
import Preloader from '../common/Preloader/Preloader'

type mapStateToPropsType = PostsStateType

type mapDispatchToProps = {
  getPosts: () => void
}

type PropsType = mapStateToPropsType & mapDispatchToProps

const PostContainer: React.FC<PropsType> = (props) => {
  const { getPosts, posts } = props

  useEffect(() => {
    props.getPosts()
  }, [])

  if (!posts[0]) {
    return <Preloader />
  }

  return (
    <div className="cont users">
      <h1>Post Container</h1>
      {posts.map(({ id, title, body }) => (
        <div key={id}>
          <NavLink to={'/posts/' + id}>
            <h2>{title}</h2>
          </NavLink>
          <div>{body}</div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  posts: state.usersPage.posts,
})

export default compose(
  connect(mapStateToProps, {
    getPosts,
  }),
)(PostContainer)
