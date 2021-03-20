import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../redux/store'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Post as PostType, Comment } from '../../redux/postsReducer'
import { getSinglePost, updatePost, deletePost, createComent } from '../../redux/postsReducer'
import Preloader from '../common/Preloader/Preloader'
import CommentComp from './Comment'
import CreateComent from './CreateComment'
import PostEditor from './PostEditor'

type mapStateToPropsType = {
  post: PostType
  isFetching: boolean
}

type mapDispatchToProps = {
  getSinglePost: (postId: number) => void
  updatePost: (postId: number, title: string, body: string) => void
  deletePost: (postId: number, history: any) => void
  createComent: (postId: number, body: string) => void
}

type PathParamsType = {
  id: string
}

type PropsType = mapStateToPropsType & mapDispatchToProps & RouteComponentProps<PathParamsType>

const SinglePost: React.FC<PropsType> = (props) => {
  const {
    isFetching,
    match,
    post: { id, title, body, comments },
  } = props

  const [mode, setMode] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const [postId, setpostId] = useState(+match.params.id)
  const [commetValue, setComentValue] = useState('')

  useEffect(() => {
    props.getSinglePost(postId)
    setTitleValue(title)
    setBodyValue(body)
  }, [mode, id, title, body])

  const toggleEditMode = () => {
    setMode(!mode)
  }

  const onChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: val },
    } = e
    setTitleValue(val)
  }

  const onChangeBodyValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value: val },
    } = e
    setBodyValue(val)
  }

  const onChangeCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value: val },
    } = e
    setComentValue(val)
  }

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    props.updatePost(postId, titleValue, bodyValue)
    setMode(false)
  }

  const onSubmitFormComment = (e: React.FormEvent) => {
    e.preventDefault()
    props.createComent(postId, commetValue)
  }

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.deletePost(postId, props.history)
  }

  if (!id) {
    return <Preloader />
  }

  return (
    <div>
      <h4>Single post</h4>
      <button onClick={toggleEditMode}>Edit</button>
      {mode && (
        <div>
          <PostEditor
            onSubmitForm={onSubmitForm}
            onChangeTitleValue={onChangeTitleValue}
            titleValue={titleValue}
            onChangeBodyValue={onChangeBodyValue}
            bodyValue={bodyValue}
            isFetching={isFetching}
            handleDeletePost={handleDeletePost}
          />
        </div>
      )}
      {!mode && (
        <div>
          <CreateComent
            onSubmitFormComment={onSubmitFormComment}
            onChangeCommentValue={onChangeCommentValue}
            commetValue={commetValue}
            title={title}
            body={body}
          />
          <CommentComp comments={comments} />
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state: AppStateType) => ({
  post: state.usersPage.post,
  isFetching: state.usersPage.isFetching,
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getSinglePost,
    updatePost,
    deletePost,
    createComent,
  }),
  withRouter,
)(SinglePost)
