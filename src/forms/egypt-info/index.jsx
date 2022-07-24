
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
  alergies: yup.string().required("Required"),
  alergiesNotes: yup.string().required("Required"),
  smoking: yup.string().required("Required"),
});

function EgyptInfo({onSubmit, setPage}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, watch, register, formState: { errors } } = useForm({ resolver });
  const alergies = watch('alergies');

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
      <input type="radio" value="Yes" {...register('alergies')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="No" {...register('alergies')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.alergies ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    <Form.Group className={`mb-3 mt-2 ${alergies === "Yes" ? '' : 'd-none'}`} controlId="alergiesNotes">
      <Form.Label>Alergies Notes</Form.Label>
      <Form.Control type="text" placeholder="Enter Alergies Notes" {...register("alergiesNotes")} />
      <Form.Control.Feedback type="invalid" className={errors.alergiesNotes ? 'd-block' : 'd-none'}>
        Please provide Alergies Notes.
      </Form.Control.Feedback>
    </Form.Group>
    <h5>Are you smoking?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="Yes" {...register('smoking')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="No" {...register('smoking')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.smoking ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    <div className="text-muted mt-3">NB: we'll send your request to the hotel to try to confirm your preference upon availability</div>

    <Row className='justify-content-end'>
      <Col xs="auto">
        <Button variant="danger" onClick={() => setPage(PAGES.BASED)} className='float-right'>
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

export default EgyptInfo