import React from 'react'
import { BtnInput, Textarea } from '../common/StyledElements/StyledElements'

type Props = {
  isFetching: boolean
  onSubmitFormComment: (e: React.FormEvent) => void
  onChangeCommentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  commetValue: string
  title: String
  body: string
}

const CreateComent: React.FC<Props> = (props) => {
  return (
    <>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <hr />
      <h4>Create coments</h4>
      <form onSubmit={props.onSubmitFormComment}>
        <Textarea onChange={props.onChangeCommentValue} value={props.commetValue} />
        <div>
          {/* <input disabled={props.isFetching} type="submit" value="Send Comment" /> */}
          <BtnInput disabled={props.isFetching} type="submit" value="Send Comment" />
        </div>
      </form>
    </>
  )
}

export default CreateComent
