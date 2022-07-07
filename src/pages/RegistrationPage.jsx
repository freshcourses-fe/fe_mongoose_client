import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import AuthActionCreators from '../redux/actions/authActionCreators';

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, utils) => {
    dispatch(AuthActionCreators.signUpRequest(values));
  };
  return (
    <div>
      <h1>SIGN UP</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name='firstName' type='text' placeholder="First Name"/>
          <Field name='lastName' type='text'  placeholder="Last Name"/>
          <Field name='email' type='email' />
          <Field name='password' type='password' />
          <button type='submit'>SIGN UP</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
