import React from 'react'
import { Form } from 'react-bootstrap'

const input = props => {
  return (
    <Form.Group className="mb-3" >
        <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
        <Form.Control
            {
                ...props
            }
        />
    </Form.Group>
  )
}

export default input