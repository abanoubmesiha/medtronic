
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
  basedIn: yup.boolean().required("Required"),
});

function BasedIn({onSubmit}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  return <Form onSubmit={handleSubmit(data => onSubmit(data, data.basedIn ? PAGES.EGYPT : PAGES.FLY))} className={errors.basedIn?'was-validated':''}>
    <h5>Based in?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="Egypt" {...register('basedIn')} className="form-check-input" /> Yes
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="Flying" {...register('basedIn')} className="form-check-input" /> No
    </div>
    <Form.Control.Feedback type="invalid" className={errors.basedIn ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Col>
    </Row>
  </Form>
}

export default BasedIn