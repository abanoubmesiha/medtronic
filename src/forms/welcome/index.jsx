import React, { useCallback } from 'react'
import { Button, Form } from 'react-bootstrap';
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
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
});

function Welcome() {
    const resolver = useYupValidationResolver(validationSchema);
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

    return <div>
        <h1>Welcome EA Annual Meeting</h1>
        <Form onSubmit={handleSubmit(data => console.log(data))}>
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

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
}

export default Welcome