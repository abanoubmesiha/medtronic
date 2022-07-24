import React, { useCallback, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PAGES } from '../utils';

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
  
const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
});

function Welcome({onSubmit, allData}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ resolver });
  
  useEffect(() => {
    reset(allData)
  }, [])

  return <Form onSubmit={handleSubmit(data => onSubmit(data, PAGES.ATTEND))}>
    <Form.Group className="mb-3" controlId="firstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" placeholder="Enter First Name" {...register("firstName")} />
      <Form.Control.Feedback type="invalid" className={errors.firstName ? 'd-block' : 'd-none'}>
        Please provide a First Name.
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="lastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Last Name" {...register("lastName")} />
      <Form.Control.Feedback type="invalid" className={errors.lastName ? 'd-block' : 'd-none'}>
        Please provide a Last Name.
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter Email" {...register("email")} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
      <Form.Control.Feedback type="invalid" className={errors.email ? 'd-block' : 'd-none'}>
        Please provide an Email.
      </Form.Control.Feedback>
    </Form.Group>

    <Row className='justify-content-end'>
      <Col xs="auto">
        <Button variant="primary" type="submit" className='float-right'>
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default Welcome