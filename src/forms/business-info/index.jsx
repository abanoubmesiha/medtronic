import React, { useCallback } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  businessTitle: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
});

function BusinessInfo({onSubmit}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  return <Form onSubmit={handleSubmit(data => onSubmit(data))} className={errors.areYou?'was-validated':''}>
    <Form.Group className="mb-3 mt-2" controlId="businessTitle">
      <Form.Label>Business Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Business Title" {...register("businessTitle")} />
      <Form.Control.Feedback type="invalid" className={errors.businessTitle ? 'd-block' : 'd-none'}>
        Please provide your Business Title.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="phoneNumber">
      <Form.Label>Phone number</Form.Label>
      <Form.Control type="text" placeholder="Enter Phone number" {...register("phoneNumber")} />
      <Form.Control.Feedback type="invalid" className={errors.phoneNumber ? 'd-block' : 'd-none'}>
        Please provide a Phone number.
      </Form.Control.Feedback>
    </Form.Group>
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default BusinessInfo