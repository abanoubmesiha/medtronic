
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
  basedIn: yup.string().required("Required"),
});

function BasedIn({onSubmit, setPage, allData}) {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ resolver });
  
  useEffect(() => {
    reset(allData)
  }, [])

  return <Form onSubmit={handleSubmit(data => onSubmit(data, data.basedIn === 'Egypt' ? PAGES.EGYPT : PAGES.FLY))} className={errors.basedIn?'was-validated':''}>
    <h5>Based in?</h5>
    <div className="form-check form-check-inline">
      <input type="radio" value="Egypt" {...register('basedIn')} className="form-check-input" /> Egypt
    </div>
    <div className="form-check form-check-inline">
      <input type="radio" value="Flying" {...register('basedIn')} className="form-check-input" /> Flying In
    </div>
    <Form.Control.Feedback type="invalid" className={errors.basedIn ? 'd-block' : 'd-none'}>
      Please provide an answer.
    </Form.Control.Feedback>

    <Row className='justify-content-end'>
      <Col xs="auto">
        <Button variant="danger" onClick={() => setPage(PAGES.BUSINESS)} className='float-right'>
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

export default BasedIn