import React from 'react'
type Props = {
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
        <textarea onChange={props.onChangeCommentValue} value={props.commetValue} />
        <div>
          <input type="submit" value="Send Comment" />
        </div>
      </form>
    </>
  )
}

export default CreateComent
