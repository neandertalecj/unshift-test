import React from 'react'
import { Button, BtnInput, Textarea, Input } from '../common/StyledElements/StyledElements'

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
          <Input onChange={props.onChangeTitleValue} type="text" value={props.titleValue} />
        </div>
        <br />
        <div>
          <Textarea onChange={props.onChangeBodyValue} value={props.bodyValue} />
        </div>
        <div>
          <BtnInput type="submit" value="Update Post" />
        </div>
      </form>
      <br />
      <div>
        <Button disabled={props.isFetching} onClick={props.handleDeletePost}>
          Delete Post
        </Button>
      </div>
    </>
  )
}

export default PostEditor
