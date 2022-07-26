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
  areYouAttending: yup.string().required("Required"),
});

function Attend({onSubmit, setPage, allData}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, watch, register, formState: { errors }, reset } = useForm({ resolver });
  
  const areYouAttending = watch('areYouAttending');
  useEffect(() => {
    reset(allData)
  }, [])

  return <Form onSubmit={handleSubmit(data => onSubmit(data, data.areYouAttending === "Yes" ? PAGES.FURTHER : PAGES.THANKYOU))} className={errors.areYouAttending?'was-validated':''}>
    <h5>Are you attending the meeting?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="Yes" {...register('areYouAttending')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="No" {...register('areYouAttending')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.areYouAttending ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>

    <Row className='justify-content-end'>
      <Col xs="auto">
        <Button variant="danger" onClick={() => setPage(PAGES.WELCOME)} className='float-right'>
          Back
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="primary" type="submit" className='float-right'>
          {areYouAttending === 'No' ? 'Submit' : 'Next'}
        </Button>
      </Col>
    </Row>
  </Form>
}

export default Attend