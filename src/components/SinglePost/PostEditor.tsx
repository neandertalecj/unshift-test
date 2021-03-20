import React from 'react'

type Props = {
  onSubmitForm: (e: React.FormEvent) => void
  onChangeTitleValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  titleValue: string
  onChangeBodyValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  bodyValue: string
  isFetching: boolean
  handleDeletePost: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PostEditor: React.FC<Props> = (props) => {
  return (
    <>
      <br />
      <form onSubmit={props.onSubmitForm}>
        <div>
          <input onChange={props.onChangeTitleValue} type="text" value={props.titleValue} />
        </div>
        <br />
        <div>
          <textarea onChange={props.onChangeBodyValue} value={props.bodyValue} />
        </div>
        <div>
          <input type="submit" value="Update Post" />
        </div>
      </form>
      <br />
      <div>
        <button disabled={props.isFetching} onClick={props.handleDeletePost}>
          Delete Post
        </button>
      </div>
    </>
  )
}

export default PostEditor
