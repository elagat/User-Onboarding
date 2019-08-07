import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({ values }) => {

  return (
    <div classname='form'>
      <h1>Form</h1>
      <Form>
       <Field type='text' name='name' placeholder='Name' />

       <Field type='email' name='email' placeholder='Email' />

       <Field type='password' name='password' placeholder='Password' />

       <label className='terms'>
        Terms of Service
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
    }
  }
})(Form);

export default Form;
