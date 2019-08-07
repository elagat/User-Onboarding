import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className='form'>
      <h1>Sign Up Form</h1>
      <Form>
       <Field type='text' name='name' placeholder='Name' />
       {touched.name && errors.name && <p className="error">{errors.name}</p>}

       <Field type='email' name='email' placeholder='Email' />
       {touched.email && errors.email && <p className="error">{errors.email}</p>}

       <Field type='password' name='password' placeholder='Password' />
       {touched.password && errors.password && <p className="error">{errors.password}</p>}

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

      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

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
