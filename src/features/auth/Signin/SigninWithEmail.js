import { Form, Formik } from 'formik';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../../Ui/TextField';

const SignupSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Required!'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .required('Password required!'),
});

const SigninWithEmail = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(true);
    resetForm({});
  };

  return (
    <Fragment>
      <h2 className="text-xl md:text-3xl font-bold mb-8">Sign in with Email</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form className="w-full space-y-4">
            <TextField name="email" type="email" label="Email" />
            <TextField name="password" type="password" label="Password" />
            <button
              type="submit"
              disabled={
                !formik.isValid ||
                (!formik.touched.email && !formik.touched.password)
              }
              className="bg-indigo-700 hover:bg-indigo-600 text-white w-full text-center py-2 font-semibold disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/signin" className="text-gray-700 underline">
        All sign in options
      </Link>
    </Fragment>
  );
};

export default SigninWithEmail;
