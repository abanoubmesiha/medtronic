
import React, { useCallback } from 'react'
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
  checkIn: yup.string().required("Required"),
  checkOut: yup.string().required("Required"),
  smoking: yup.boolean().required("Required"),
});

function EgyptInfo({onSubmit}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  return <Form onSubmit={handleSubmit(data => onSubmit(data, PAGES.THANKYOU))} className={errors.areYou?'was-validated':''}>
    <Form.Group className="mb-3 mt-2" controlId="checkIn">
      <Form.Label>Hotel check in Date</Form.Label>
      <Form.Control type="date" placeholder="Enter Hotel check in Date" {...register("checkIn")} />
      <Form.Control.Feedback type="invalid" className={errors.checkIn ? 'd-block' : 'd-none'}>
        Please provide a Hotel check in Date.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3 mt-2" controlId="checkOut">
      <Form.Label>Hotel check out Date</Form.Label>
      <Form.Control type="date" placeholder="Enter Hotel check out Date" {...register("checkOut")} />
      <Form.Control.Feedback type="invalid" className={errors.checkOut ? 'd-block' : 'd-none'}>
        Please provide a Hotel check out Date.
      </Form.Control.Feedback>
    </Form.Group>
    <h5>Any food alergies?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="true" {...register('function')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="false" {...register('function')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.function ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    <h5>Are you smoking?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="true" {...register('smoking')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="false" {...register('smoking')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.smoking ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    <div className="text-muted mt-3">NB: we'll send your request to the hotel to try to confirm your preference upon availability</div>
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default EgyptInfo