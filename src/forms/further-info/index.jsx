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
  functionOrCommercial: yup.string().required("Required"),
  nationality: yup.string().required("Required"),
  passportNumber: yup.string().required("Required"),
  departingCity: yup.string().required("Required"),
  departingCountry: yup.string().required("Required"),
});

function FurtherInfo({onSubmit}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  return <Form onSubmit={handleSubmit(data => onSubmit(data, PAGES.BUSINESS))} className={errors.areYou?'was-validated':''}>
    <h5>Are you function or commercial?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="function" {...register('functionOrCommercial')} className="form-check-input" /> function
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="commercial" {...register('functionOrCommercial')} className="form-check-input" /> commercial
    </div>
    <Form.Control.Feedback type="invalid" className={errors.functionOrCommercial ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    
    <Form.Group className="mb-3 mt-2" controlId="nationality">
      <Form.Label>Nationality</Form.Label>
      <Form.Control type="text" placeholder="Enter Nationality" {...register("nationality")} />
      <Form.Control.Feedback type="invalid" className={errors.nationality ? 'd-block' : 'd-none'}>
        Please provide a Nationality.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="passportNumber">
      <Form.Label>Passport number</Form.Label>
      <Form.Control type="text" placeholder="Enter Passport number" {...register("passportNumber")} />
      <Form.Control.Feedback type="invalid" className={errors.passportNumber ? 'd-block' : 'd-none'}>
        Please provide a Passport number.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="departingCity">
      <Form.Label>City from where you'll be departing</Form.Label>
      <Form.Control type="text" placeholder="Enter City from where you'll be departing" {...register("departingCity")} />
      <Form.Control.Feedback type="invalid" className={errors.departingCity ? 'd-block' : 'd-none'}>
        Please provide a City from where you'll be departing.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="departingCountry">
      <Form.Label>Country from where you'll be departing</Form.Label>
      <Form.Control type="text" placeholder="Enter Country from where you'll be departing" {...register("departingCountry")} />
      <Form.Control.Feedback type="invalid" className={errors.departingCountry ? 'd-block' : 'd-none'}>
        Please provide a Country from where you'll be departing.
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

export default FurtherInfo