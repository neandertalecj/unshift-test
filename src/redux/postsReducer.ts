import { postsAPI } from '../api/api'
import { AppStateType } from './store'
import { ThunkAction } from 'redux-thunk'

export const SET_POSTS = 'POSTS/SET_POSTS'
export const SET_SINGLE_POST = 'POSTS/SET_SINGLE_POST'
export const SET_POST_COMMENT = 'POSTS/SET_POST_COMMENT'
export const SET_IS_FETCHING = 'POSTS/SET_IS_FETCHING'
export const SET_SINGLE_COMMENT = 'POSTS/SET_SINGLE_COMMENT'
export const SET_COMMENTS = 'POSTS/SET_COMMENTS'

export type PostsStateType = {
  posts: Post[]
  post: Post
  comment: Comment[]
  isFetching: boolean
}

export type Post = {
  id: number | null
  title: string
  body: string
  comments: Comment[]
}

export type Comment = {
  id: number
  postId: number
  body: string
}

const initialState: PostsStateType = {
  posts: [],
  post: {
    id: null,
    title: '',
    body: '',
    comments: [],
  },
  comment: [],
  isFetching: false,
}

const usersReducer = (state = initialState, action: ActionsTypes): PostsStateType => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload }
    case SET_SINGLE_POST:
      return { ...state, post: action.payload }
    case SET_COMMENTS:
      return { ...state, comment: [...action.payload] }
    case SET_SINGLE_COMMENT:
      return { ...state, comment: [...state.comment, action.payload] }

    default:
      return state
  }
}

type ActionsTypes =
  | SetPostsActionType
  | SetSeinglePostActionType
  | SetIsFetChingActionType
  | SetSingleCommentActionType
  | SetCommentsActionType

type SetPostsActionType = {
  type: typeof SET_POSTS
  payload: Post[]
}
type SetSeinglePostActionType = {
  type: typeof SET_SINGLE_POST
  payload: Post
}
type SetIsFetChingActionType = {
  type: typeof SET_IS_FETCHING
  payload: boolean
}
type SetSingleCommentActionType = {
  type: typeof SET_SINGLE_COMMENT
  payload: Comment
}
type SetCommentsActionType = {
  type: typeof SET_COMMENTS
  payload: Comment[]
}

const setPosts = (posts: Post[]): SetPostsActionType => ({ type: SET_POSTS, payload: posts })
const setSinglePosts = (post: Post): SetSeinglePostActionType => ({ type: SET_SINGLE_POST, payload: post })
const setIsFetching = (isFatching: boolean): SetIsFetChingActionType => ({ type: SET_IS_FETCHING, payload: isFatching })
const setSingleComment = (com: Comment): SetSingleCommentActionType => ({ type: SET_SINGLE_COMMENT, payload: com })
const setComments = (com: Comment[]): SetCommentsActionType => ({ type: SET_COMMENTS, payload: com })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getPosts = (): ThunkType => async (dispatch) => {
  try {
    const res = await postsAPI.getPosts()
    dispatch(setPosts(res))
  } catch (err) {
    console.log('getPosts ERROR', err.message)
  }
}

export const getSinglePost = (postId: number): ThunkType => async (dispatch) => {
  try {
    const post = await postsAPI.getPost(postId)
    dispatch(setSinglePosts(post))
    dispatch(setComments(post.comments))
  } catch (err) {
    console.log('getSinglePost ERROR', err.message)
  }
}

export const updatePost = (postId: number, title: string, body: string): ThunkType => async (dispatch) => {
  try {
    const res = await postsAPI.updatePost(postId, title, body)
    dispatch(setSinglePosts(res))
  } catch (err) {
    console.log('updatePost ERROR', err.message)
  }
}

export const createPost = (title: string, body: string, history: any): ThunkType => async (dispatch) => {
  try {
    const res = await postsAPI.createPosts(title, body)
    history.push(`/posts/${res.id}`)
  } catch (err) {
    console.log('updatePost ERROR', err.message)
  }
}

export const deletePost = (postId: number, history: any): ThunkType => async (dispatch) => {
  try {
    setIsFetching(true)
    const res = await postsAPI.deletePost(postId)
    history.push('/')
    setIsFetching(false)
  } catch (err) {
    console.log('getSinglePost ERROR', err.message)
  }
}

export const createComent = (postId: number, body: string): ThunkType => async (dispatch) => {
  try {
    setIsFetching(true)
    const com = await postsAPI.createComent(postId, body)
    dispatch(setSingleComment(com))
    setIsFetching(false)
  } catch (err) {
    console.log('getSinglePost ERROR', err.message)
  }
}

export default usersReducer
