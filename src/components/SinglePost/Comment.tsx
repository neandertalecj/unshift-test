import React from 'react'
import { Comment } from '../../redux/postsReducer'

type Props = {
  comments: Comment[]
}

const CommentComp: React.FC<Props> = (props) => {
  return (
    <div>
      <h3>Comments</h3>
      {props.comments &&
        props.comments.map(({ body, id }) => (
          <div key={id}>
            <p>{body}</p>
          </div>
        ))}
    </div>
  )
}

export default CommentComp
