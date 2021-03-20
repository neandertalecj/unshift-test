import axios from 'axios'
import { Comment, Post } from '../redux/postsReducer'

const instance = axios.create({
  baseURL: 'https://bloggy-api.herokuapp.com/',
})

export const postsAPI = {
  getPosts() {
    return instance
      .get<Post[]>('/posts')
      .then((data) => data.data)
      .catch((err) => err)
  },
  getPost(postId: number) {
    return instance
      .get<Post>(`/posts/${postId}?_embed=comments`)
      .then((data) => data.data)
      .catch((err) => err)
  },
  updatePost(postId: number, title: string, body: string) {
    return instance
      .put<Post>(`/posts/${postId}`, { title, body })
      .then((data) => data.data)
      .catch((err) => err)
  },
  deletePost(postId: number) {
    return instance
      .delete<Post>(`/posts/${postId}`)
      .then((data) => data.data)
      .catch((err) => err)
  },
  createPosts(title: string, body: string) {
    return instance
      .post<Post>('/posts', { title, body })
      .then((data) => data.data)
      .catch((err) => err)
  },
  createComent(postId: number, body: string) {
    return instance
      .post<Comment>('/comments', { postId, body })
      .then((data) => data.data)
      .catch((err) => err)
  },
}
