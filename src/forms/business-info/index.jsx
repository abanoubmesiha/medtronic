import React, { useCallback, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
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
  businessTitle: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
});

function BusinessInfo({onSubmit, setPage, allData}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ resolver });
  
  useEffect(() => {
    reset(allData)
  }, [])

  return <Form onSubmit={handleSubmit(data => onSubmit(data, PAGES.BASED))} className={errors.areYou?'was-validated':''}>
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

    <Row className='justify-content-end'>
      <Col xs="auto">
        <Button variant="danger" onClick={() => setPage(PAGES.FURTHER)} className='float-right'>
          Back
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="primary" type="submit" className='float-right'>
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default BusinessInfo