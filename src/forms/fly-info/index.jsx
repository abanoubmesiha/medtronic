

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
  arrivalCarrierName: yup.string().required("Required"),
  arrivalFlightNumber: yup.string().required("Required"),
  arrivalTime: yup.string().required("Required"),
  departureCarrierName: yup.string().required("Required"),
  departureFlightNumber: yup.string().required("Required"),
  departureTime: yup.string().required("Required"),
  checkIn: yup.string().required("Required"),
  checkOut: yup.string().required("Required"),
  alergies: yup.string().required("Required"),
  smoking: yup.string().required("Required"),
});

function FlyInfo({onSubmit}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  return <Form onSubmit={handleSubmit(data => onSubmit(data, PAGES.THANKYOU))} className={errors.areYou?'was-validated':''}>
    <h4>Arrival flight details</h4>
    <Form.Group className="mb-3 mt-2" controlId="arrivalCarrierName">
      <Form.Label>Air carrier name</Form.Label>
      <Form.Control type="text" placeholder="Enter Air carrier name" {...register("arrivalCarrierName")} />
      <Form.Control.Feedback type="invalid" className={errors.arrivalCarrierName ? 'd-block' : 'd-none'}>
        Please provide a Air carrier name.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3 mt-2" controlId="arrivalFlightNumber">
      <Form.Label>Arrival to Cairo Flight number </Form.Label>
      <Form.Control type="text" placeholder="Enter Arrival to Cairo Flight number " {...register("arrivalFlightNumber")} />
      <Form.Control.Feedback type="invalid" className={errors.arrivalFlightNumber ? 'd-block' : 'd-none'}>
        Please provide an Arrival to Cairo Flight number.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3 mt-2" controlId="arrivalTime">
      <Form.Label>Arrival time to Cairo </Form.Label>
      <Form.Control type="time" placeholder="Enter Arrival time to Cairo " {...register("arrivalTime")} />
      <Form.Control.Feedback type="invalid" className={errors.arrivalTime ? 'd-block' : 'd-none'}>
        Please provide an Arrival time to Cairo.
      </Form.Control.Feedback>
    </Form.Group>
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
    <h4>Departure flight details</h4>
    <Form.Group className="mb-3 mt-2" controlId="departureCarrierName">
      <Form.Label>Air carrier name</Form.Label>
      <Form.Control type="text" placeholder="Enter Air carrier name" {...register("departureCarrierName")} />
      <Form.Control.Feedback type="invalid" className={errors.departureCarrierName ? 'd-block' : 'd-none'}>
        Please provide a Air carrier name.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3 mt-2" controlId="departureFlightNumber">
      <Form.Label>Departure from Cairo Flight number </Form.Label>
      <Form.Control type="text" placeholder="Enter Departure from Cairo Flight number " {...register("departureFlightNumber")} />
      <Form.Control.Feedback type="invalid" className={errors.departureFlightNumber ? 'd-block' : 'd-none'}>
        Please provide an Departure from Cairo Flight number.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3 mt-2" controlId="departureTime">
      <Form.Label>Departure time from Cairo </Form.Label>
      <Form.Control type="time" placeholder="Enter Departure time from Cairo " {...register("departureTime")} />
      <Form.Control.Feedback type="invalid" className={errors.departureTime ? 'd-block' : 'd-none'}>
        Please provide an Departure time from Cairo.
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
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default FlyInfo