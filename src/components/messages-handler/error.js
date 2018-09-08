import React from 'react'
import { Message } from 'semantic-ui-react'

export const ErrorMessage = () => (
  <Message negative>
    <Message.Header>We're sorry we can't apply that discount</Message.Header>
    <p>That offer has expired</p>
  </Message>
)
