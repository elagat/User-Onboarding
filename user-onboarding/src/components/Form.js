import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({ values }) => {

  return (
    <div className='form'>
      <h1>Sign Up Form</h1>
      <Form>
       <Field type='text' name='name' placeholder='Name' />

       <Field type='email' name='email' placeholder='Email' />

       <Field type='password' name='password' placeholder='Password' />

       <label className='terms'>
        Accept Terms of Service
        <Field
          type='checkbox'
          name='terms'
          checked={values.terms}
        />
       </label>

       <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required('Password must contain 8 characters'),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => console.log(error.response));
  }
})(SignUpForm);

export default FormikForm;
