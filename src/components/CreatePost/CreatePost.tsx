import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { createPost } from '../../redux/postsReducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Input, Button } from '../common/StyledElements/StyledElements'

type mapDispatchToProps = {
  createPost: (title: string, body: string, history: any) => void
}
type PropsType = mapDispatchToProps & RouteComponentProps

const validationSchemas = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
})

const CreatePost: React.FC<PropsType> = (props) => {
  const submit = (values: any, actions: any) => {
    props.createPost(values.title, values.body, props.history)
    props.history
    actions.resetForm({
      values: {
        title: '',
        body: '',
      },
    })
  }

  return (
    <div>
      <Formik initialValues={{ title: '', body: '' }} validationSchema={validationSchemas} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <h2>Create new post</h2>
            <div>
              <Input type="title" name="title" as={Field} />
              <ErrorMessage className="error-message" name="title" component="div" />
            </div>
            <br />
            <div>
              <Field className="textarea" as="textarea" type="body" name="body" />
              <ErrorMessage className="error-message" name="body" component="div" />
            </div>
            <br />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default compose<React.ComponentType>(connect(null, { createPost }), withRouter)(CreatePost)
